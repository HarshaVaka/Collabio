using AutoMapper;
using BuddyGoals.Entities;
using BuddyGoals.DTOs;

namespace BuddyGoals.Mappings
{
    public class UserProfileMappingProfile : Profile
    {
        public UserProfileMappingProfile()
        {
            CreateMap<UserProfile, UpdateUserProfileDto>()
                 .ForSourceMember(src => src.Country, opt => opt.DoNotValidate());

            // PATCH DTO → Entity
            CreateMap<UpdateUserProfileDto, UserProfile>()
                .ForMember(dest => dest.Country, opt => opt.Ignore())
                .ForAllMembers(opt =>
                    opt.Condition((src, dest, srcValue) =>
                        srcValue != null));
        }
    }
}
