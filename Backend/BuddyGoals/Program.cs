using BuddyGoals;
using BuddyGoals.Data;
using BuddyGoals.Data.Seed;
using BuddyGoals.Entities;
using BuddyGoals.Mappings;
using BuddyGoals.Repositories;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services;
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

Log.Logger =  new LoggerConfiguration().WriteTo.Console().WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.Configure<PasswordHasherOptions>(options =>
{
    options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2;
});


//Mapper
builder.Services.AddAutoMapper(typeof(AuthMappingProfile));
builder.Services.AddAutoMapper(typeof(UserProfileMappingProfile));

//passwordHasher
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddHttpContextAccessor();
//Business Layer
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFriendService, FriendService>();

//Repo Layer
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IRefreshTokenRepo, RefreshTokenRepo>();
builder.Services.AddScoped<IFriendRepo, FriendRepo>();

//  Add DbContext
builder.Services.AddDbContext<BuddyGoalsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; ;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    var config = builder.Configuration;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = config["Jwt:Issuer"],
        ValidAudience = config["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"] ?? "")),
        ClockSkew = TimeSpan.Zero // optional: default is 5 min
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx =>
        {
            if (ctx.Request.Cookies.ContainsKey("accessToken"))
            {
                ctx.Token = ctx.Request.Cookies["accessToken"];
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [
    "http://localhost:5000",
      "http://localhost:5173"
    ];


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // needed for cookies/session
    });
});
builder.Services.AddMemoryCache();
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
});

// Register both so DI can create either
builder.Services.AddScoped<MemoryCacheService>();
builder.Services.AddScoped<RedisCacheService>();

builder.Services.AddScoped<ICacheService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var useRedis = config.GetValue<bool>("CacheSettings:UseRedis");

    if (useRedis)
    {
        try
        {
            // Try initializing Redis
            var redis = sp.GetRequiredService<RedisCacheService>();
            // Optional: test connection here if needed
            return redis;
        }
        catch (Exception ex)
        {
            var logger = sp.GetRequiredService<ILogger<Program>>();
            logger.LogWarning(ex, "Redis unavailable, falling back to memory cache");
            return sp.GetRequiredService<MemoryCacheService>();
        }
    }

    return sp.GetRequiredService<MemoryCacheService>();
});


builder.Environment.EnvironmentName = 
    Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

var app = builder.Build();
app.UseSerilogRequestLogging();
app.UseMiddleware<GlobalExceptionHandler>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsEnvironment("Testing"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
if (app.Environment.IsProduction() || app.Environment.IsEnvironment("Testing"))
{
    var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
    app.Urls.Clear();
    app.Urls.Add($"http://0.0.0.0:{port}");
}

//using (var scope = app.Services.CreateScope())
//{
//    var context = scope.ServiceProvider.GetRequiredService<BuddyGoalsDbContext>();
//    DbSeeder.Seed(context);
//}
app.Run();
