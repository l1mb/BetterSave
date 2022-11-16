using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input.Spending;
using AuthServiceApp.WEB.DTOs.Spending;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class SpendingProfile : Profile
    {
        public SpendingProfile()
        {
            CreateMap<Spending, SpendingDto>()
                .ReverseMap()
                .ForMember(mem => mem.ShopPositions, opt => opt.Ignore())
                .ForMember(mem => mem.Shop, opt => opt.Ignore());
        }
    }
}
