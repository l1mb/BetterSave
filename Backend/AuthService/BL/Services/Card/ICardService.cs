using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Card;

namespace AuthServiceApp.BL.Services.Card
{
    public interface ICardService : IGenericService<CardEntity>
    {
        Task<CardDto> CreateCard(CardDto cardDto);
        Task<CardDto> GetCardById(Guid cardId);
        Task<List<CardDto>> GetCardsByUserId(string cardId);
        Task<CardDto> UpdateCard(CardUpdateDto cardUpdateDto);
    }
}