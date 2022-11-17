using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Card;

namespace AuthServiceApp.BL.Services.Card
{
    public interface ICardService : IGenericService<CardEntity>
    {
        Task<CardEntity> CreateCard(CardDto cardDto);
        Task<List<CardDto>> GetCards(string userId);
    }
}