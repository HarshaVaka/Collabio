using BuddyGoals.DTOs;
using BuddyGoals.Entities;

namespace BuddyGoals.Services.IServices
{
    public interface IJwtService
    {
        string GenerateAccessToken(GenerateAccessTokenDto? generateAccessTokenDto);
        RefreshToken GenerateRefreshToken(string ipAddress);
    }
}
