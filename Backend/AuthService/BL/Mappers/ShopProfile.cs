using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input.Shop;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class ShopProfile : Profile
    {
        public ShopProfile()
        {
            CreateMap<Shop, ShopDto>().ReverseMap();
        }
    }
}
