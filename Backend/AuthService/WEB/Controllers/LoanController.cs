using AuthServiceApp.BL.Services.Loan;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Loan;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    public class LoanController : GenericController<LoanEntity>
    {
        private readonly ILoanService loanService;
        public LoanController(ILoanService loanService)
        {
            this.loanService = loanService;
        }

        [HttpPost("/api/loan")]
        public async Task<ActionResult> CreateLoan([FromBody] LoanDto dto)
        {
            var result = await loanService.CreateLoan(dto);

            return Created(Url.Action(), result);
        }

        [HttpGet("/api/loan/{id}")]
        public async Task<LoanDto> GetLoanById(Guid id)
        {
            var result = await loanService.GetLoanById(id);

            return result;
        }

        [HttpGet("/api/loan/user/{userId}")]
        public async Task<List<LoanDto>> GetUserLoans(Guid userId)
        {
            var result = await loanService.GetUserLoans(userId);

            return result;
        }

        [HttpPut("/api/loan")]
        public async Task<LoanDto> UpdateLoan([FromBody] UpdateLoanDto updateDto)
        {
            var result = await loanService.UpdateLoan(updateDto);

            return result;
        }

        [HttpDelete("/api/loan/{id}")]
        public async Task<IActionResult> DeleteLoan(Guid id)
        {
            await loanService.DeleteAsync(id);

            return NoContent();
        }
    }
}
