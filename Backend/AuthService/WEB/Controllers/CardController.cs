using AuthServiceApp.BL.Services.Card;
using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Card;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/card")]
    public class CardController : GenericController
    {
        private readonly ICardService _cardService;
        private readonly ISpendingRepository _spendingRepository;
        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCard(CardDto cardDto)
        {
            var res = await _cardService.CreateCard(cardDto);

            return Created(Url.ActionLink(), res);
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<ActionResult<List<CardDto>>> GetCards()
        {
            var res = await _cardService.GetCardsByUserId(GetUserId());

            return res;
        }

        [HttpGet]
        public async Task<ActionResult<List<CardDto>>> GetCards(Guid userId)
        {
            var res = await _cardService.GetCardsByUserId(userId.ToString());

            return res;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardDto>> GetCard(Guid id)
        {
            var res = await _cardService.GetCardById(id);

            return res;
        }

        [HttpPut]
        public async Task<ActionResult<CardDto>> UpdateCard(CardUpdateDto updateDto)
        {
            var res = await _cardService.UpdateCard(updateDto);

            return res;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CardEntity>> DeleteCard(Guid id)
        {

            await _cardService.SoftDeleteAsync(id);

            return NoContent();
        }
    }
}
