using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Loan;
using AutoMapper;
using Microsoft.AspNetCore.Http.Features;

namespace AuthServiceApp.BL.Services.Loan
{
    public class LoanService : GenericService<LoanEntity>, ILoanService
    {
        private readonly IBaseRepository<LoanEntity?> _loanRepository;
        private readonly IMapper mapper;
        public LoanService(IBaseRepository<LoanEntity?> repository, IMapper mapper) : base(repository)
        {
            this.mapper = mapper;
            this._loanRepository = repository;
        }

        public async Task<LoanDto> CreateLoan(LoanDto dto)
        {
            var entity = mapper.Map<LoanEntity>(dto);

            var result = await _loanRepository.CreateItemAsync(entity);
            var returnDto = mapper.Map<LoanDto>(result);

            return returnDto;
        }

        public async Task<List<LoanDto>> GetUserLoans(Guid userId)
        {
            var result = await _loanRepository.SearchForMultipleItemsAsync(loan => loan.UserId == userId, item => item.IsMine);

            var mapped = mapper.Map<List<LoanDto>>(result);

            return mapped;
        }

        public async Task<LoanDto> GetLoanById(Guid id)
        {
            var result = await _loanRepository.SearchForSingleItemAsync(loan => loan.Id == id);

            var mapped = mapper.Map<LoanDto>(result);

            return mapped;
        }

        public async Task<LoanDto> UpdateLoan(UpdateLoanDto updateDto)
        {
            var searchItem = await _loanRepository.SearchForSingleItemAsync(item => item.Id == updateDto.Id);

            ExceptionUtilities.CheckExtractionStatus(searchItem);

            var entity = mapper.Map<LoanEntity>(updateDto);
            //TODO test merger
            Merger.CopyValues<LoanEntity>(searchItem, entity);

            var result = await _loanRepository.UpdateItemAsync(entity);

            ExceptionUtilities.CheckSaveStatus(result);

            return mapper.Map<LoanDto>(result);
        }
    }
}
