using AutoMapper;
using BuddyGoals.Data;
using BuddyGoals.DTOs;
using BuddyGoals.Entities;
using BuddyGoals.Repositories.IRepositories;
using Microsoft.AspNet.Identity;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

namespace BuddyGoals.Repositories
{
    public class UserRepo(BuddyGoalsDbContext dbContext) : IUserRepo
    {
        private readonly BuddyGoalsDbContext _dbContext = dbContext;

        public async Task<User> RegisterUserAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
        public async Task<UserProfile> AddUserProfileAsync(UserProfile profile)
        {
            await _dbContext.UserProfiles.AddAsync(profile);
            await _dbContext.SaveChangesAsync();
            return profile;
        }

        public async Task<UserDetailsDto?> GetUserDetailsAsync(string username)
        {
            var userDetails = await _dbContext.Users.Include(u => u.Profile)
                .Where(u => u.UserName == username)
                .Select(u =>new UserDetailsDto { 
                    UserName = u.UserName,
                    Email = u.Email,
                    ProfilePicUrl= "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
                }).FirstOrDefaultAsync();
            return userDetails;
        }

        public async Task<User?> GetUserByUserIdAsync(Guid userId)
        {
            return await _dbContext.Users
                  .Include(u => u.UserRoles)
                  .ThenInclude(ur => ur.Role)
                  .FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<User?> GetUserByEmailAsync(string mail)
        {
            return await _dbContext.Users
                  .Include(u => u.UserRoles)
                  .ThenInclude(ur => ur.Role)
                  .FirstOrDefaultAsync(u => u.Email == mail);
        }
        public async Task<User?> GetUserByUserId(Guid userId)
        {
            return await _dbContext.Users
                .Include(urm => urm.UserRoles)
                .ThenInclude(r => r.Role)
                .FirstOrDefaultAsync(u => u.UserId == userId);
        }
        public async Task<UserProfileDto?> GetUserProfileAsync(string username)
        {
            var userProfileDetails =  await _dbContext.Users
                .Include(u => u.Profile)
                .Where(u => u.UserName == username)
                .Select(u => new UserProfileDto
                {
                    UserName = u.UserName,
                    Email = u.Email,
                    ProfilePicUrl = "https://media.craiyon.com/2025-07-12/_4dZ32QVTBSVcgD5FEQ6yg.webp",
                    FirstName = u.Profile.FirstName, 
                    LastName = u.Profile.LastName,
                    Bio = u.Profile.Bio,
                    DOB = u.Profile.DOB,
                    Country = u.Profile.CountryCode,
                    PhoneNo = u.Profile.PhoneNo,
                    Gender = u.Profile.Gender
                }).FirstOrDefaultAsync();
            return userProfileDetails;
        }
        public async Task<UserProfile?> GetUserProfileByUserIDAsync(Guid userId)
        {
            var userProfile = await _dbContext.UserProfiles
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();
            return userProfile;
        }
        public async Task<int> UpdateProfileAsync(UserProfile userProfile)
        {
            _dbContext.UserProfiles.Update(userProfile);
            await _dbContext.SaveChangesAsync();
            return 1;
        }
    }
}
