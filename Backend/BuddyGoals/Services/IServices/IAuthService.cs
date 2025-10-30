using BuddyGoals.DTOs;


namespace BuddyGoals.Services.IServices
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto, string ipAddress);

        Task<AuthResponseDto> LoginAsync(HttpContext httpContext, LoginDto loginDto, string ipAddress);

        Task SignOutAsync(HttpContext httpContext);

        Task<AuthResponseDto> RefreshTokenAsync(HttpContext httpContext, string ipAddress);
    }
}
