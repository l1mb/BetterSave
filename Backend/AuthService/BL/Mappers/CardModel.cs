using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Card;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class CardModel : Profile
    {
        public CardModel()
        {
            CreateMap<CardEntity, CardDto>().ReverseMap();
        }
    }
}
