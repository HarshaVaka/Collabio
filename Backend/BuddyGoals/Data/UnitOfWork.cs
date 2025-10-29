using System;

namespace BuddyGoals.Data
{
    public class UnitOfWork(BuddyGoalsDbContext context) : IUnitOfWork
    {
        private readonly BuddyGoalsDbContext _dbContext = context;

        public async Task ExecuteInTransactionAsync(Func<Task> operation)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                await operation();                   
                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }

}
