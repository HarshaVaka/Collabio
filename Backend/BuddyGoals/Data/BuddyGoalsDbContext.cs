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
        public DbSet<Friend> Friends { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }


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

            modelBuilder.Entity<FriendRequest>(entity =>
            {
                entity.HasKey(fr => fr.RequestId);

                entity.Property(fr => fr.Status)
                      .HasConversion<int>()    
                      .IsRequired();

                entity.HasOne(fr => fr.Sender)
                      .WithMany()              
                      .HasForeignKey(fr => fr.SenderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(fr => fr.Receiver)
                      .WithMany()
                      .HasForeignKey(fr => fr.ReceiverId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.Property(fr => fr.CreatedAt)
                      .HasDefaultValueSql("NOW()");

                // Avoid duplicate friend requests
                entity.HasIndex(fr => new { fr.SenderId, fr.ReceiverId })
                      .IsUnique();
            });

            modelBuilder.Entity<Friend>(entity =>
            {
                entity.HasKey(f => f.Id);

                entity.HasOne(f => f.User)
                      .WithMany()
                      .HasForeignKey(f => f.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(f => f.FriendUser)
                      .WithMany()
                      .HasForeignKey(f => f.FriendId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.Property(f => f.CreatedAt)
                      .HasDefaultValueSql("NOW()");

                // Avoid duplicate friendships
                entity.HasIndex(f => new { f.UserId, f.FriendId })
                      .IsUnique();
            });

        }
    }
}
