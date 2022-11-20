using AuthServiceApp.BL.Services.Card;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Card;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    public class CardController : GenericController<CardEntity>
    {
        private readonly ICardService _cardService;
        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpPost("/api/card")]
        public async Task<ActionResult> CreateCard(CardDto cardDto)
        {
            var res = await _cardService.CreateCard(cardDto);

            return Created(Url.ActionLink(), res);
        }

        [HttpGet("/api/card/my")]
        public async Task<ActionResult<List<CardDto>>> GetCards()
        {
            var res = await _cardService.GetCardsByUserId(GetUserId());

            return res;
        }

        [HttpGet("/api/card")]
        public async Task<ActionResult<List<CardDto>>> GetCards(Guid userId)
        {
            var res = await _cardService.GetCardsByUserId(userId.ToString());

            return res;
        }

        [HttpGet("/api/card/{id}")]
        public async Task<ActionResult<CardDto>> GetCard(Guid id)
        {
            var res = await _cardService.GetCardById(id);

            return res;
        }

        [HttpPut("/api/card")]
        public async Task<ActionResult<CardDto>> UpdateCard(CardUpdateDto updateDto)
        {
            var res = await _cardService.UpdateCard(updateDto);

            return res;
        }

        [HttpDelete("/api/card/{id}")]
        public async Task<ActionResult<CardEntity>> DeleteCard(Guid id)
        {
            var res = await _cardService.DeleteAsync(id);

            return res;
        }
    }
}
