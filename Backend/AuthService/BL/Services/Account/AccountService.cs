using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Mappers;
using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Repo.Account;
using AuthServiceApp.WEB.DTOs.Account;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Account
{
    public class AccountService: IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public AccountService(IAccountRepository accountRepository, IMapper mapper)
        {
            this._accountRepository = accountRepository;
            this._mapper = mapper;
        }


        public async Task<AccountModel> CreateAccountAsync(CreateAccountModel model)
        {
            var entity = _mapper.Map<AccountEntity>(model);
            var result  = await _accountRepository.CreateItemAsync(entity);

            return _mapper.Map<AccountModel>(result);
        }

        public async Task<AccountModel> UpdateAccountAsync(UpdateAccountModel model)
        {
            var item = await _accountRepository.SearchForSingleItemAsync(acc => acc.Id == model.Id);

            if (item is null)
            {
                throw new ApplicationHelperException("Item with this id not found");
            }

            var entity = _mapper.Map(model, item);
            var result = await _accountRepository.UpdateItemAsync(entity);

            return _mapper.Map<AccountModel>(result);
        }

        public async Task DeleteAccountAsync(Guid accountId)
        {
            await _accountRepository.RemoveItemAsync(item => item.Id == accountId);
        }

        public async Task<List<AccountModel>> GetAllAccountsAsync(Guid userId)
        {
            var result = await _accountRepository.SearchForMultipleItemsAsync(x => x.UserId == userId, y => y.Balance);

            return _mapper.Map<List<AccountModel>>(result);
        }
    }

    public interface IAccountService
    {
        public Task<AccountModel> CreateAccountAsync(CreateAccountModel model);
        public Task<AccountModel> UpdateAccountAsync(UpdateAccountModel model);
        public Task DeleteAccountAsync(Guid  accountId);
        public Task<List<AccountModel>> GetAllAccountsAsync(Guid userId);
    }
}
