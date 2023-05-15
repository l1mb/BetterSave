using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthServiceApp.DAL.Repo.Account;

public class AccountRepository : BaseRepository<AccountEntity>, IAccountRepository
{
    public AccountRepository(ApplicationDbContext databaseContext) : base(databaseContext)
    {
    }

    public Task<List<AccountEntity>> GetAllUserAccounts(Guid userId)
    {
        return Entity.Where(account => account.UserId == userId).Include(x => x.Operations).ToListAsync();
    }
}

public interface IAccountRepository : IBaseRepository<AccountEntity>
{
    Task<List<AccountEntity>> GetAllUserAccounts(Guid userId);
}