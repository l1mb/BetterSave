using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.WEB.DTOs.Input.Spending;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    public class SpendingController : ControllerBase
    {
        private readonly ISpendingService spendingService;
        public SpendingController(ISpendingService spendingService)
        {
            this.spendingService = spendingService;
        }

        [HttpPost("api/spending")]
        public async Task<ActionResult> CreateSpending(SpendingDto spendingDto)
        {
            var result = await spendingService.CreateSpending(spendingDto);

            return Ok(result);
        }

        [HttpGet("api/spending/{id}")]
        public async Task<ActionResult> GetSpending(Guid id)
        {
            var result = await spendingService.GetSpendingAsync(id);

            return Ok(result);
        }

        [HttpGet("api/spending")]
        public async Task<ActionResult> GetSpendings(DateTime beginDate, int offset, int limit = 10)
        {
            var result = await spendingService.GetSpendingsAsync(beginDate, limit, offset);

            return Ok(result);
        }

        [HttpDelete("api/spending/{id}")]
        public async Task<ActionResult> DeleteSpending(Guid id)
        {
            var result = await spendingService.DeleteSpendingAsync(id);

            return Ok(result);
        }

    }
}
