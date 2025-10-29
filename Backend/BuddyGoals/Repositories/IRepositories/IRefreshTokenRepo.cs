using BuddyGoals.Entities;
namespace BuddyGoals.Repositories.IRepositories
{
    public interface IRefreshTokenRepo
    {
        Task<RefreshToken?> GetRefreshTokenAsync(string token);
        Task<RefreshToken?> AddRefreshTokenAsync(RefreshToken refreshToken);
        Task UpdateRefreshTokenAsync(RefreshToken refreshToken);
    }
}