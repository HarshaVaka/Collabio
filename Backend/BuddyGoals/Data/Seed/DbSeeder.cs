using Bogus;
using BuddyGoals.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using System;

namespace BuddyGoals.Data.Seed
{
    public static class DbSeeder
    {
        private static readonly string[] items = ["Male", "Female", "Other"];
        private static readonly PasswordHasher<User> _passwordHasher = new();


        public static void Seed(BuddyGoalsDbContext context)
        {
            var existingUserCount = context.Users.Count();
            if (existingUserCount >= 973)
            {
                Console.WriteLine($"[Seeder] Found {existingUserCount} users, skipping seeding.");
                return;
            }
            int toGenerate = 973 - existingUserCount;
            Console.WriteLine($"[Seeder] Seeding {toGenerate} mock users...");

            var userFaker = new Faker<User>()
                .RuleFor(u => u.UserId, f => Guid.NewGuid())
                .RuleFor(u => u.UserName, f => f.Internet.UserName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.HashedPassword, (f, u) => _passwordHasher.HashPassword(u, "Password123"))
                .RuleFor(u => u.CreatedAt, f => f.Date.Past().ToUniversalTime())
                .RuleFor(u => u.ModifiedAt, f => DateTime.UtcNow)
                .RuleFor(u => u.CreatedBy, f => "Seeder")
                .RuleFor(u => u.ModifiedBy, f => "Seeder")
                .RuleFor(u => u.Profile, (f, u) => new UserProfile
                {
                    ProfileId = Guid.NewGuid(),
                    UserId = u.UserId,
                    FirstName = f.Name.FirstName(),
                    LastName = f.Name.LastName(),
                    PhoneNo = f.Phone.PhoneNumber("+91##########"),
                    CountryCode = f.Address.CountryCode(),
                    Gender = f.PickRandom(items),
                    Bio = f.Lorem.Sentence(6),
                    DOB = DateOnly.FromDateTime(f.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime()),
                    ProfileUrl = f.Internet.Avatar(),
                    CreatedAt = DateTime.UtcNow,
                    ModifiedAt = DateTime.UtcNow,
                    CreatedBy = "Seeder",
                    ModifiedBy = "Seeder"
                });

            var users = userFaker.Generate(toGenerate);
            context.Users.AddRange(users);
            context.SaveChanges();

            Console.WriteLine($"[Seeder] Successfully seeded {toGenerate} users!");
        }
    }
}
