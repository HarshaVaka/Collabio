using AutoMapper;
using BuddyGoals.Entities;
using BuddyGoals.DTOs;

namespace BuddyGoals.Mappings
{
    public class UserProfileMappingProfile:Profile
    {
        public UserProfileMappingProfile()
        {
            CreateMap<UserProfile, UpdateUserProfileDto>();

            // PATCH DTO → Entity
            CreateMap<UpdateUserProfileDto, UserProfile>()
                .ForAllMembers(opt =>
                    opt.Condition((src, dest, srcValue) =>
                        srcValue != null)); 
        }
    }
}
