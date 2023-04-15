﻿using AuthServiceApp.BL.Services.Account;
using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Entities.Operations;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Operations;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Operation;

public class OperationService : IOperationService
{
    private readonly IBaseRepository<OperationEntity> _operationRepository;
    private readonly IBaseRepository<AccountEntity> _accountRepository;
    private readonly IAccountService _accountService;
    private readonly IMapper _mapper;

    public OperationService(IMapper mapper, IBaseRepository<OperationEntity> operationRepository,
        IBaseRepository<AccountEntity> accountRepository, IAccountService accountService)
    {
        _mapper = mapper;
        _operationRepository = operationRepository;
        _accountRepository = accountRepository;
        _accountService = accountService;
    }

    public async Task<IEnumerable<OperationModel>> GetOperationsByAccountAsync(Guid accountId)
    {
        var res = await _operationRepository.SearchForMultipleItemsAsync(x => x.AccountId == accountId,
            x => x.CreatedDate);

        return _mapper.Map<List<OperationModel>>(res);
    }

    public async Task<IEnumerable<OperationModel>> GetOperationsByUserIdAsync(Guid userId)
    {
        var accounts = await _accountService.GetAllAccountsAsync(userId);
        var result = accounts.SelectMany(account=> account.Operations);

        return result;
    }

    public async Task<OperationModel> CreateOperationAsync(CreateOperationModel model)
    {
        var entity = _mapper.Map<OperationEntity>(model);
        var result = await _operationRepository.CreateItemAsync(entity);

        return _mapper.Map<OperationModel>(result);
    }

    public async Task DeleteOperationAsync(Guid operationId)
    {
        await _operationRepository.RemoveItemAsync(operation => operation.Id == operationId);
    }
}