using BuddyGoals.DTOs;
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuddyGoals.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(ILogger<AuthController> logger, IAuthService authService, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        private readonly ILogger<AuthController> _logger = logger;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IAuthService _authService = authService;

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            string ipAddress = GetIpAddress();
            _logger.LogInformation("Registration attempt from IP: {IpAddress}", ipAddress);
            var result = await _authService.RegisterAsync(registerDto, ipAddress);
            return Ok(result);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            string ipAddress = GetIpAddress();
            _logger.LogInformation("Registration attempt from IP: {IpAddress}", ipAddress);
            var result = await _authService.LoginAsync(HttpContext, loginDto, ipAddress);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.SignOutAsync(HttpContext);
            return Ok("Logged out");
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            _logger.LogInformation("Refresh token attempt");
            string ipAddress = GetIpAddress();
            var result = await _authService.RefreshTokenAsync(HttpContext, ipAddress);
            return Ok(result);
        }

        private string GetIpAddress()
        {
            return _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        }
    }

}
