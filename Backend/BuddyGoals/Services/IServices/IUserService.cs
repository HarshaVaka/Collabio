using BuddyGoals.DTOs;
using Microsoft.AspNetCore.JsonPatch;

namespace BuddyGoals.Services.IServices
{
    public interface IUserService
    {
        Task<UserDetailsDto?> GetUserDetails(string username);
        Task<UserProfileDto?> GetUserProfileDetails(string username);
        Task<int> UpdateUserProfileDetails(Guid userId, JsonPatchDocument<UpdateUserProfileDto> patchDoc);
        Task<List<SearchUserDto>> GetUsersListBySearchTerm(Guid userId,string searchTerm);
    }
}
