using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class AimModel : Profile
    {
        public AimModel()
        {
            CreateMap<AimEntity, AimDto>().ReverseMap();
        }
    }
}
