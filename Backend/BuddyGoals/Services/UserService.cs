using BuddyGoals.DTOs;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services.IServices;

namespace BuddyGoals.Services
{
    public class UserService(IUserRepo userRepo):IUserService
    {
        private readonly IUserRepo _userRepo=userRepo;
        public async Task<UserDetailsDto> GetUserDetails(string username)
        {
            var userDetails = await _userRepo.GetUserDetailsAsync(username);
            return userDetails;
        }
    }
}
