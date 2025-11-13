using AutoMapper;
using BuddyGoals.Data;
using BuddyGoals.DTOs;
using BuddyGoals.Entities;
using BuddyGoals.Exceptions;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services.IServices;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace BuddyGoals.Services
{
    public class AuthService(IUserRepo authRepo, IMapper mapper, IPasswordHasher passwordHasher, IJwtService jwtService, IConfiguration configuration, IRefreshTokenRepo refreshTokenRepo, IHttpContextAccessor httpContextAccessor,IUnitOfWork unitOfWork,IUserRepo userRepo) : IAuthService
    {
        private readonly IUserRepo _authRepo = authRepo;
        private readonly IMapper _mapper = mapper;
        private readonly IPasswordHasher _passwordHasher = passwordHasher;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IConfiguration _configuration = configuration;
        private readonly IRefreshTokenRepo _refreshTokenRepo = refreshTokenRepo;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IUserRepo _userRepo = userRepo;

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto, string ipAddress)
        {
            var user = _mapper.Map<User>(registerDto);
            user.HashedPassowrd = _passwordHasher.HashPassword(registerDto.Password);
            user.CreatedAt = DateTime.UtcNow;
            user.UserId = Guid.NewGuid();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                user = await _authRepo.RegisterUserAsync(user);
                var profile = new UserProfile { 
                    UserId = user.UserId, 
                    FirstName=registerDto.FirstName,
                    LastName=registerDto.LastName,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = user.UserName,
                };
                await _userRepo.AddUserProfileAsync(profile);
            });
            

            var generateTokenDto = _mapper.Map<GenerateAccessTokenDto>(user);
            var accessToken = _jwtService.GenerateAccessToken(generateTokenDto);
            var refreshToken = _jwtService.GenerateRefreshToken(ipAddress);
            refreshToken.UserId = user.UserId;

            await _refreshTokenRepo.AddRefreshTokenAsync(refreshToken);
            var response = _httpContextAccessor.HttpContext!.Response;
            response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = refreshToken.ExpiresAt
            });
            return new AuthResponseDto
            {
                AccessToken = accessToken,
                AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])
                )
            };
        }

        public async Task<AuthResponseDto> LoginAsync(HttpContext httpContext, LoginDto loginDto, string ipAddress)
        {
            User? user;
            user = await _authRepo.GetUserByEmailAsync(loginDto.Email ?? "");
            if (user != null)
            {
                var result = _passwordHasher.VerifyHashedPassword(user.HashedPassowrd, loginDto.Password);
                if (result == Microsoft.AspNet.Identity.PasswordVerificationResult.Success)
                {
                    var generateTokenDto = _mapper.Map<GenerateAccessTokenDto>(user);
                    var accessToken = _jwtService.GenerateAccessToken(generateTokenDto);
                    RefreshToken refreshToken = _jwtService.GenerateRefreshToken(ipAddress);
                    refreshToken.UserId = user.UserId;

                    await _refreshTokenRepo.AddRefreshTokenAsync(refreshToken);
                    var response = _httpContextAccessor.HttpContext!.Response;
                    response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = refreshToken.ExpiresAt
                    });

                    return new AuthResponseDto
                    {
                        AccessToken = accessToken,
                        AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(
                            Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"]))
                    };
                    //Session or Cookie based auth 
                    // var claims = new List<Claim>
                    // {
                    //     new(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    //     new(ClaimTypes.Name, user.UserName??""), 
                    // };
                    // foreach (var userRole in user.UserRoles)
                    // {
                    //     claims.Add(new Claim(ClaimTypes.Role, userRole.Role.RoleName));
                    // }

                    // var claimsIdentity = new ClaimsIdentity(
                    //     claims,
                    //     CookieAuthenticationDefaults.AuthenticationScheme
                    // );
                    // var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                    // await httpContext.SignInAsync(
                    //     CookieAuthenticationDefaults.AuthenticationScheme,
                    //     claimsPrincipal,
                    //     new AuthenticationProperties
                    //     {
                    //         IsPersistent = true,
                    //         ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
                    //     }
                    //     );
                }
                else
                {
                    throw new ApiException("Incorrect Password", StatusCodes.Status401Unauthorized);
                }
            }
            else
            {

                throw new ApiException("User Not Found", StatusCodes.Status401Unauthorized);

            }
        }

        public async Task SignOutAsync(HttpContext httpContext)
        {
            await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
        
        public async Task<AuthResponseDto> RefreshTokenAsync(HttpContext httpContext, string ipAddress)
        {
            var request = httpContext.Request;
            var refreshToken = request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new ApiException("Refresh Token is missing", StatusCodes.Status400BadRequest);
            }
            var existingRefreshToken = await _refreshTokenRepo.GetRefreshTokenAsync(refreshToken);
            if (existingRefreshToken == null || !existingRefreshToken.IsActive)
            {
                throw new ApiException("Invalid Refresh Token", StatusCodes.Status400BadRequest);
            }
            var user = await _authRepo.GetUserByUserIdAsync(existingRefreshToken.UserId) ?? throw new ApiException("User Not Found", StatusCodes.Status404NotFound);
            //generate new refresh token and access token
            var newAccessToken = _jwtService.GenerateAccessToken(_mapper.Map<GenerateAccessTokenDto>(user));
            var newRefreshToken = _jwtService.GenerateRefreshToken(ipAddress);
            newRefreshToken.UserId = user.UserId;

            //revoke old refresh token
            existingRefreshToken.Revoked = DateTime.UtcNow;
            existingRefreshToken.RevokedByIp = ipAddress;
            existingRefreshToken.ReplacedByToken = newRefreshToken.Token;

            await _refreshTokenRepo.UpdateRefreshTokenAsync(existingRefreshToken);
            await _refreshTokenRepo.AddRefreshTokenAsync(newRefreshToken);

            var response = httpContext.Response;
            response.Cookies.Append("refreshToken", newRefreshToken.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = newRefreshToken.ExpiresAt
            });

            return new AuthResponseDto
            {
                AccessToken = newAccessToken,
                AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])
                )
            };
        }
    }
}
