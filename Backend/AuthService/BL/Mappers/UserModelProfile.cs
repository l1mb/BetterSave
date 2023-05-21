using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input;
using AuthServiceApp.WEB.DTOs.Output;
using AuthServiceApp.WEB.DTOs.Output.User;
using AuthServiceApp.WEB.DTOs.User;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class UserModelProfile : Profile
    {
        public UserModelProfile()
        {
            CreateMap<SignInDto, ApplicationUser>().ReverseMap();

            CreateMap<SignUpDto, ApplicationUser>().ReverseMap();
            CreateMap<UserDto, ApplicationUser>().ReverseMap();

            CreateMap<SignUpOutputDto, ApplicationUser>().ReverseMap();
            CreateMap<SignUpOutputDto, SignUpDto>().ReverseMap();
        }
    }
}