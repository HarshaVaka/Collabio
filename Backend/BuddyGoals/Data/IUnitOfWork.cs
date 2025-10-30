namespace BuddyGoals.Data
{
    public interface IUnitOfWork
    {
        Task ExecuteInTransactionAsync(Func<Task> operation);
    }

}
