using BuddyGoals.DTOs;
using AutoMapper;
using BuddyGoals.Entities;

namespace BuddyGoals.Mappings
{
    public class AuthMappingProfile : Profile
    {
        public AuthMappingProfile()
        {
            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.HashedPassowrd, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedAt, opt => opt.Ignore());


            CreateMap<User, GenerateAccessTokenDto>()
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src =>
                src.UserRoles.Select(ur => ur.Role.RoleName).ToArray()));

            // GenerateAccessTokenDto → User
            CreateMap<GenerateAccessTokenDto, User>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore());
        }
    }
}
