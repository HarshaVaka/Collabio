using BuddyGoals.Entities;
using Microsoft.EntityFrameworkCore;

namespace BuddyGoals.Data
{
    public class BuddyGoalsDbContext(DbContextOptions<BuddyGoalsDbContext> options):DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRoleMapping> UserRoles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Country> Countries { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey("UserId");
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.UserName).IsUnique();
            });
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey("ProfileId");
            });

            modelBuilder.Entity<UserRoleMapping>(entity =>
            {
                entity.HasKey("UserId", "RoleId");
            });

            modelBuilder.Entity<UserRoleMapping>(entity =>
            {
                entity.HasOne(u => u.User)
                .WithMany(urm => urm.UserRoles)
                .HasForeignKey(u => u.UserId);
            });
            modelBuilder.Entity<UserRoleMapping>(entity =>
            {
                entity.HasOne(r => r.Role)
                .WithMany(urm => urm.UserRoles)
                .HasForeignKey(r => r.RoleId);
            });
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasOne(rt => rt.User)
                    .WithMany(u => u.RefreshTokens)
                    .HasForeignKey(rt => rt.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(rt => rt.UserId); // Index on UserId
            });
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasOne(up => up.User)
                  .WithOne(u => u.Profile)
                  .HasForeignKey<UserProfile>(up => up.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(rt => rt.UserId);
            });

            modelBuilder.Entity<Country>()
                .HasKey(c => c.CountryCode);

            modelBuilder.Entity<UserProfile>()
                .HasOne(up => up.Country)
                .WithMany(c => c.UserProfiles)
                .HasForeignKey(up => up.CountryCode)
                .HasPrincipalKey(c => c.CountryCode)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
