using AuthServiceApp.DAL.Repo.Account;
using AuthServiceApp.WEB.DTOs.Account;

namespace AuthServiceApp.BL.Services.Account
{
    public class AccountService: IAccountService
    {
        private IAccountRepository accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }


        public Task<AccountModel> CreateAccountAsync(CreateAccountModel model)
        {
            throw new NotImplementedException();
        }

        public Task<AccountModel> UpdateAccountAsync(UpdateAccountModel model)
        {
            throw new NotImplementedException();
        }

        public Task<AccountModel> DeleteAccountAsync(Guid accountId)
        {
            throw new NotImplementedException();
        }

        public Task<List<AccountModel>> GetAllAccountsAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }

    public interface IAccountService
    {
        public Task<AccountModel> CreateAccountAsync(CreateAccountModel model);
        public Task<AccountModel> UpdateAccountAsync(UpdateAccountModel model);
        public Task<AccountModel> DeleteAccountAsync(Guid  accountId);
        public Task<List<AccountModel>> GetAllAccountsAsync(Guid userId);
    }
}
