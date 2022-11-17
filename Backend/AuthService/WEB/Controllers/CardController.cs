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

        [HttpPost("/api/card")]
        public async Task<ActionResult> GetCards()
        {
            var res = await _cardService.GetCards(GetUserId());

            return res;
        }

        [HttpPost("/api/card")]
        public async Task<ActionResult<CardEntity>> UpdateCard(CardDto cardDto)
        {
            var res = await _cardService.CreateCard(cardDto);

            return res;
        }

        [HttpDelete("/api/card/{id}")]
        public async Task<ActionResult> DeleteCard(Guid id)
        {
            var res = await _cardService.DeleteAsync(id);

            return NoContent();
        }



    }
}
