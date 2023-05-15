using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Services.AimRecording;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.BL.Services.Operation;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo.Aim;
using AuthServiceApp.WEB.DTOs.Aim;
using AuthServiceApp.WEB.DTOs.Operations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.BL.Services.Aim;

public class AimService : GenericService<AimEntity>, IAimService
{
    private readonly IBaseRepository<AimEntity> _repository;
    private readonly IMapper _mapper;
    private readonly IAimRepository _aimRepository;
    private readonly IAimRecordingService _recordingService;
    private readonly IOperationService _operationService;

    public AimService(IBaseRepository<AimEntity> repository, IMapper mapper, IAimRepository aimRepository,
        IAimRecordingService recordingService, IOperationService operationService) : base(repository)
    {
        _repository = repository;
        _mapper = mapper;
        _aimRepository = aimRepository;
        _recordingService = recordingService;
        _operationService = operationService;
    }

    public async Task<AimDto> CreateAim(AimDto dto)
    {
        var prevEntity = await GetAimByUserId(dto.UserId);
        if (prevEntity is not null)
            throw new ApplicationHelperException(ServiceResultType.InvalidData,
                ExceptionMessageConstants.ItemExistCannotSave);
        var entity = _mapper.Map<AimEntity>(dto);
        entity.CreationDate = DateTime.Now;
        var saveResult = await _repository.CreateItemAsync(entity);

        ExceptionUtilities.CheckSaveStatus(saveResult);
        var outResult = _mapper.Map<AimDto>(saveResult);
        return outResult;
    }

    public async Task<GetAimDto> GetAimByUserId(Guid id)
    {
        var res = await GetOneAsync(item => item.UserId == id);
        return _mapper.Map<GetAimDto>(res);
    }

    public async Task<AimDto> GetAimById(Guid id)
    {
        var res = await GetOneAsync(item => item.Id == id);
        return _mapper.Map<AimDto>(res);
    }

    public async Task<AimDto> Delete(Guid id)
    {
        var res = await DeleteAsync(id);
        if (res is null)
            throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.NotFound);
        return _mapper.Map<AimDto>(res);
    }

    [HttpPut("/api/aim")]
    public async Task<AimDto> UpdateAsync(UpdateAimDto dto)
    {
        var item = await _repository.SearchForSingleItemAsync(item => item.Id == dto.Id);

        item.Name = dto.Name;


        var res = await _repository.UpdateItemAsync(item);
        if (res is null)
            throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.NotFound);

        return _mapper.Map<AimDto>(item);
    }

    public async Task<List<AimDto>> GetAllActiveAims()
    {
        var res = await _repository.SearchWithIncludeItemAsync(x => x.IsMastered == null && x.IsDeleted == false,
            y => y.AimRecordings);
        return _mapper.Map<List<AimDto>>(res);
    }

    public async Task<AimDto> MasterAim(Guid dtoId, bool value)
    {
        var prevEntity = await _aimRepository.FindOneById(dtoId);
        if (prevEntity != null)
        {
            prevEntity.IsMastered = value;
            await _repository.UpdateItemAsyncWithModified(prevEntity, x => x.IsMastered);
        }

        return _mapper.Map<AimDto>(prevEntity);
    }

    #region JOB

    public async Task MainAimFunctionWrapper(AimDto x)
    {
        await MainAimFunction(x);
    }

    private async Task<float> GetSumOfOperations(AimDto dto, DateTime startDate, DateTime endDate)
    {
        var operations = (await _operationService.GetOperationsByUserIdAsync(dto.UserId)).ToList();
        var res = new List<OperationModel>();
        if (dto.Type == AimType.IncreaseIncome)
            res = operations.Where(x => x.Type == OperationTypes.Income).ToList();
        else if (dto.Type == AimType.ExpenseLess)
            res = operations.Where(x => x.Type == OperationTypes.Expense).ToList();

        var grouped = operations.Where(x => x.CreatedDate < endDate && x.CreatedDate > startDate).GroupBy(x => x.Type)
            .Select(g => new
            {
                g.Key,
                Value = g.Sum(s => s.Value)
            }).ToList();
        var neededOperationType = OperationTypes.Expense;
        if (dto.Type == AimType.IncreaseIncome)
            neededOperationType = OperationTypes.Income;
        else if (dto.Type == AimType.ExpenseLess) neededOperationType = OperationTypes.Expense;

        var keyValue = grouped.SingleOrDefault(x => x.Key == neededOperationType);
        if (keyValue is null) return 0;

        return keyValue.Value;
    }

    private async Task<bool?> GetIsMastered(AimDto dto)
    {
        var sum = 0f;
        bool? result = null;

        if (dto.DateType == AimDateType.DailyToDate)
        {
            sum = await GetSumOfOperations(dto, DateTime.Now.AddDays(-1).Date, DateTime.Now);

            //result = CheckAimCriteria(sum, dto.Type, dto.Amount);
            result = CheckIfAimExpires(dto);
        }

        else if (dto.DateType == AimDateType.ToDate)
        {
            sum = await GetSumOfOperations(dto, dto.CreationDate, DateTime.Now);
            if (CheckIfAimExpires(dto))
                result = CheckAimCriteria(sum, dto.Type, dto.Amount);
            else
                result = null;
        }

        return result;
    }

    private bool CheckIfAimExpires(AimDto dto)
    {
        return DateTime.Now.Date == dto.FinishDate.Date;
    }

    private async Task CreateRecordings(AimDto dto)
    {
        if (dto.DateType == AimDateType.DailyCount || dto.DateType == AimDateType.DailyToDate)
        {
            var sum = await GetSumOfOperations(dto, dto.CreationDate, DateTime.Now);
            var result = CheckAimCriteria(sum, dto.Type, dto.Amount);
            if (result)
                await _recordingService.CreateAimRecordingAsync(new()
                {
                    Date = DateTime.Now,
                    AimId = Guid.Parse(dto.Id.ToString() ?? string.Empty)
                });
        }
    }
        
    public async Task MainAimFunction(AimDto dto)
    {
        var isMastered = await GetIsMastered(dto);
        await CreateRecordings(dto);
        if (isMastered is not null) await MasterAim(Guid.Parse(dto.Id.ToString() ?? string.Empty), (bool)isMastered);
    }

    public async Task<AimProgressDto> GetProgressAsync(string userId)
    {
        var aim =  await GetAimByUserId(Guid.Parse(userId));

        var recordings = await _recordingService.GetAimRecordingAsync(aim.Id);

        var sumOfOperations = await GetSumOfOperations(aim, aim.CreationDate, DateTime.Now);

        var percent = sumOfOperations / aim.Amount;

        return new()
        {
            AimRecords = recordings,
            Percent = percent
        };
    }


    private bool CheckAimCriteria(float sum, AimType type, float amount)
    {       
        var result = false;
        if (type == AimType.IncreaseIncome)
            result = sum > amount;
        else if (type == AimType.ExpenseLess) result = sum < amount;

        return result;
    }

    #endregion
}