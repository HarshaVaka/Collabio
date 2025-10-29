using BuddyGoals.Data;
using BuddyGoals.Entities;
using BuddyGoals.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroService.Repositories
{
    public class RefreshTokenRepo(BuddyGoalsDbContext dbContext) : IRefreshTokenRepo
    {
        private readonly BuddyGoalsDbContext _dbContext = dbContext;

        public async Task<RefreshToken?> AddRefreshTokenAsync(RefreshToken refreshToken)
        {
            await _dbContext.RefreshTokens.AddAsync(refreshToken);
            await _dbContext.SaveChangesAsync();
            return refreshToken;
        }

        public async Task<RefreshToken?> GetRefreshTokenAsync(string token)
        {
            return await _dbContext.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == token);
        }

        public async Task UpdateRefreshTokenAsync(RefreshToken refreshToken)
        {
            _dbContext.RefreshTokens.Update(refreshToken);
            await _dbContext.SaveChangesAsync();
        }
    }
}