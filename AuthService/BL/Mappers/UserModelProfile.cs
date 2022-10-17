using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input;
using AuthServiceApp.WEB.DTOs.Output;
using AutoMapper;

namespace GameStore.BL.Mappers
{
    public class UserModelProfile : Profile
    {
        public UserModelProfile()
        {
            CreateMap<SignInDto, ApplicationUser>().ReverseMap();

            CreateMap<SignUpDto, ApplicationUser>().ReverseMap();

            CreateMap<SignUpOutputDto, ApplicationUser>().ReverseMap();
            CreateMap<SignUpOutputDto, SignUpDto>().ReverseMap();
        }
    }
}