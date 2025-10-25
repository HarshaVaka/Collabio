using BuddyGoals.Entities;
using Microsoft.EntityFrameworkCore;

namespace BuddyGoals.Data
{
    public class BuddyGoalsDbContext(DbContextOptions<BuddyGoalsDbContext> options):DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
