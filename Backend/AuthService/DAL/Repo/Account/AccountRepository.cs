using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;

namespace AuthServiceApp.DAL.Repo.Account
{
    public class AccountRepository:BaseRepository<AccountEntity>,  IAccountRepository
    {
        public AccountRepository(ApplicationDbContext databaseContext) : base(databaseContext)
        {
        }
    }

    public interface IAccountRepository: IBaseRepository<AccountEntity>
    {
        
    }
}
