using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input.Spending;
using AuthServiceApp.WEB.DTOs.Spending;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/spending")]
    public class SpendingController : GenericController
    {
        private readonly ISpendingService spendingService;
        public SpendingController(ISpendingService spendingService)
        {
            this.spendingService = spendingService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateSpending(SpendingDto spendingDto)
        {
            var result = await spendingService.CreateSpending(spendingDto);

            return Ok(result);
        }

        [HttpGet("byCategories/{cardId}")]
        public async Task<ActionResult> GetSpendingData(Guid cardId)
        {
            var userId = GetUserId();
            var result = await spendingService.GetInfoOnCategories(cardId, userId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSpending(Guid id)
        {
            var result = await spendingService.GetSpendingAsync(id);

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<SpendingReportDto>>> GetSpendings(DateTime beginDate, int offset, string orderBy, Guid? cardId, int limit = 10)
        {
            var result = await spendingService.GetSpendingsAsync(beginDate, limit, offset, orderBy, cardId);

            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSpending(Guid id)
        {
            var result = await spendingService.DeleteSpendingAsync(id);

            return Ok(result);
        }

    }
}
