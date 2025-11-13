using AutoMapper;
using BuddyGoals.DTOs;
using BuddyGoals.Exceptions;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.JsonPatch;

namespace BuddyGoals.Services
{
    public class UserService(IUserRepo userRepo,IMapper mapper):IUserService
    {
        private readonly IUserRepo _userRepo=userRepo;
        private readonly IMapper _mapper=mapper;

        public async Task<UserDetailsDto?> GetUserDetails(string username)
        {
            var userDetails = await _userRepo.GetUserDetailsAsync(username);
            return userDetails;
        }

        public async Task<UserProfileDto?> GetUserProfileDetails(string username)
        {
            var userDetails = await _userRepo.GetUserProfileAsync(username);
            return userDetails;
        }

        public async Task<int> UpdateUserProfileDetails(Guid userId, JsonPatchDocument<UpdateUserProfileDto> patchDoc)
        {
            var profileEntity = await _userRepo.GetUserProfileByUserIDAsync(userId) ?? throw new ApiException("Profile Not Found", StatusCodes.Status404NotFound);

            // Step 2: Convert entity → update DTO
            var profileDto = _mapper.Map<UpdateUserProfileDto>(profileEntity);

            // Step 3: Apply JSON Patch
            patchDoc.ApplyTo(profileDto);

            // Step 4: Validate patched DTO
            //ValidatePatchedProfile(profileDto);

            // Step 5: Map patched DTO → entity
            _mapper.Map(profileDto, profileEntity);

            await _userRepo.UpdateProfileAsync(profileEntity);
            return 1;
        }

        public async Task<List<SearchUserDto>> GetUsersListBySearchTerm(Guid userId,string searchTerm)
        {
            return await _userRepo.GetUsersListBySearchTerm(userId, searchTerm);
        }

    }
}
