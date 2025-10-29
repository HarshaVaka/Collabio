using BuddyGoals.DTOs;
using BuddyGoals.Entities;

namespace BuddyGoals.Repositories.IRepositories
{
    public interface IUserRepo
    {
        Task<User> RegisterUserAsync(User user);
        Task<UserProfile> AddUserProfileAsync(UserProfile userProfile);
        Task<UserDetailsDto> GetUserDetailsAsync(string username);
        Task<User?> GetUserByUserIdAsync(Guid userId);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByUserId(Guid userId);
    }
}
