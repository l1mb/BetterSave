using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Loan;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class Loan : Profile
    {
        public Loan()
        {
            CreateMap<LoanEntity, LoanDto>().ReverseMap();
            CreateMap<LoanEntity, UpdateLoanDto>().ReverseMap();
        }
    }
}
