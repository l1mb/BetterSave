using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input;
using AuthServiceApp.WEB.DTOs.Output;
using AuthServiceApp.WEB.DTOs.Roles;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class RoleModelProfile : Profile
    {
        public RoleModelProfile()
        {
            CreateMap<RoleDto, ApplicationRole>().ReverseMap();

        }
    }
}
