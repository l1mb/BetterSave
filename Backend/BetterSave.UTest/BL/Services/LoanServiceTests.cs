using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Mappers;
using AuthServiceApp.BL.Services.Loan;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Loan;
using AutoFixture;
using AutoFixture.AutoFakeItEasy;
using AutoMapper;
using FakeItEasy;
using Moq;

namespace BetterSave.UTest.BL.Services;

public class LoanServiceTests
{
    [Fact]
    public async Task ShouldReturnNotFoundOnGetEntity()
    {
        //Arrange
        var repository = A.Fake<IBaseRepository<LoanEntity>>();
        A.CallTo(() => repository.SearchForSingleItemAsync(A<Expression<Func<LoanEntity, bool>>>.Ignored))!.Returns(Task.FromResult<LoanEntity>(null));
        var mapper = A.Fake<IMapper>();
        
        var loanService = new LoanService(repository, mapper);

        var fixture = new Fixture()
        {
            Behaviors = { new NullRecursionBehavior() }
        };

        var loan = fixture.Create<LoanEntity>();

        //Act
        async Task Action()
        {
            await loanService.GetLoanById(loan.UserId);
        }

        //Assert
        await Assert.ThrowsAsync<ApplicationHelperException>(Action);

    }

    [Fact]
    public async Task GetLoanById_WithExistingId_ReturnsLoanDto()
    {
        // Arrange
        var id = Guid.NewGuid();
        var userId = Guid.NewGuid();
        var loan = new LoanEntity { Id = id, Amount = 1000, ReturnDate = DateTime.Now, UserId = userId };
        var loanDto = new LoanDto { Id = id, Amount = 1000, ReturnDate = DateTime.Now, UserId = userId };
        var repository = A.Fake<IBaseRepository<LoanEntity>>();
        A.CallTo(() => repository.SearchForSingleItemAsync(A<Expression<Func<LoanEntity, bool>>>.Ignored)).Returns(Task.FromResult(loan));
        var mapper = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<LoanEntity, LoanDto>()));
        var service = new LoanService(repository, mapper);

        // Act
        var result = await service.GetLoanById(id);

        // Assert
        Assert.Equal(loanDto, result, new LoanDtoEqualityComparer());
    }

    [Fact]
    public async Task ShouldReturnEmptyList()
    {
        //Arrange
        var repository = A.Fake<IBaseRepository<LoanEntity>>();
        var mapper = A.Fake<IMapper>();

        var loanService = new LoanService(repository, mapper);

        var fixture = new Fixture()
        {
            Behaviors = { new NullRecursionBehavior() }
        };

        var loan = fixture.Create<LoanEntity>();

        //Act
        var loanList  = await loanService.GetUserLoans(loan.UserId);
        //Assert
        Assert.Empty(loanList);
    }

    private class LoanDtoEqualityComparer : IEqualityComparer<LoanDto>
    {
        public bool Equals(LoanDto x, LoanDto y)
        {
            return x.UserId == y.UserId && x.Id == y.Id;
        }

        public int GetHashCode(LoanDto obj)
        {
            return obj.Id.GetHashCode();
        }
    }

  
}