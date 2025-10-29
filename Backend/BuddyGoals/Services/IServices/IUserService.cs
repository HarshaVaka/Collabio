using BuddyGoals.DTOs;

namespace BuddyGoals.Services.IServices
{
    public interface IUserService
    {
        Task<UserDetailsDto> GetUserDetails(string username);
    }
}
