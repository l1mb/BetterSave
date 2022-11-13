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
    }
}
