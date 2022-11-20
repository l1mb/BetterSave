using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Loan;

namespace AuthServiceApp.BL.Services.Loan
{
    public interface ILoanService : IGenericService<LoanEntity>
    {
        Task<LoanDto> CreateLoan(LoanDto dto);
        Task<LoanDto> GetLoanById(Guid id);
        Task<List<LoanDto>> GetUserLoans(Guid userId);
        Task<LoanDto> UpdateLoan(UpdateLoanDto updateDto);
    }
}