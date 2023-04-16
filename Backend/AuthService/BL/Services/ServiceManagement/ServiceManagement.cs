using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Services.Aim;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.BL.Services.Operation;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Aim;
using AuthServiceApp.WEB.DTOs.Operations;
using Microsoft.AspNetCore.Components.Web;
using SixLabors.ImageSharp.Drawing.Processing.Processors.Text;

namespace AuthServiceApp.BL.Services.ServiceManagement;

public class ServiceManagement : IServiceManagement
{
    private readonly IUserService _userService;
    private readonly IEmailSender _emailSender;
    private readonly IAimService _aimService;
    private readonly IOperationService _operationService;

    public ServiceManagement(IUserService userService, IEmailSender emailSender, IAimService aimService,
        IOperationService operationService)
    {
        _userService = userService;
        _emailSender = emailSender;
        _aimService = aimService;
        _operationService = operationService;
    }

    public void SendEmail()
    {
        Console.WriteLine("Send email");
    }

    public void UpdateDatabase()
    {
        Console.WriteLine($"Update database : Long running task {DateTimeOffset.Now:MM/dd/yyyy}");
    }

    public void SyncData()
    {
        Console.WriteLine($"sync : Short running task {DateTimeOffset.Now:MM/dd/yyyy}");
    }

    public async Task CheckUserLoans()
    {
        var result = await _userService.GetUsersWithLoansBeforeTomorrow();

        var emailMessages = result.Select(item => (item.Item1.Email.ToString(),
            "Администрация проекта BetterSave уведомляет: " + (!item.Item2.IsMine
                ? "вы должны "
                : "вам должен ") + item.Item2.Name + $"{item.Item2.Amount}")).ToList();

        emailMessages.ForEach(
            x =>
            {
                _emailSender.SendEmailAsync(x.Item1, "Долги", x.Item2);
                Console.WriteLine($"Message was send to address {x.Item1} \n time: {DateTimeOffset.Now}");
            });
    }

    public async Task SendSuccessMessage(string email)
    {
        await _emailSender.SendEmailAsync(email, "Регистрация",
            "Благодарим вас за регистрацию в нашем приложении.");
        Console.WriteLine($"Message was send to address {email} \n time: {DateTimeOffset.Now}");
    }

    public async Task CheckUsersAims()
    {
        var allRecordings = await _aimService.GetAllActiveAims();
        var daily = allRecordings.Where(x => x.DateType == AimDateType.DailyCount);

        var dailyToDate = allRecordings.Where(x => x.DateType == AimDateType.DailyToDate);
        var toDate = allRecordings.Where(x => x.DateType == AimDateType.ToDate).ToList();
    }

    private async Task<float> GetSumOfOperations(AimDto dto, DateTime startDate, DateTime endDate)
    {
        var operations = (await _operationService.GetOperationsByUserIdAsync(dto.UserId)).ToList();
        var res = new List<OperationModel>();
        if (dto.Type == AimType.IncreaseIncome)
        {
            res = operations.Where(x => x.Type == OperationTypes.Income).ToList();
        }
        else if (dto.Type == AimType.ExpenseLess)
        {
            res = operations.Where(x => x.Type == OperationTypes.Expense).ToList();
        }

        var grouped = operations.Where(x => x.CreatedDate < endDate && x.CreatedDate > startDate).GroupBy(x => x.Type).Select(g => new
        {
            Key = g.Key,
            Value = g.Sum(s => s.Value)
        }).ToList();
        var neededOperationType = OperationTypes.Expense;
        if (dto.Type == AimType.IncreaseIncome)
        {
            neededOperationType = OperationTypes.Income;
        }
        else if (dto.Type == AimType.ExpenseLess)
        {
            neededOperationType = OperationTypes.Expense;
        }

        var keyValue = grouped.SingleOrDefault(x => x.Key == neededOperationType);
        if (keyValue is null)
        {
            return 0;
        }

        return keyValue.Value;
    }

    private async Task<bool> GetIsMastered(AimDto dto)
    {
        var sum = 0f;
        var result = false;

        if (dto.DateType == AimDateType.DailyToDate)
        {
            sum = await GetSumOfOperations(dto, DateTime.Now.AddDays(-1).Date, DateTime.Now.Date);

            //result = CheckAimCriteria(sum, dto.Type, dto.Amount);
            result = CheckIfAimExpires(dto);
        }

        else if (dto.DateType == AimDateType.ToDate)
        {
            sum = await GetSumOfOperations(dto, dto.CreationDate, DateTime.Now.Date);

            result = CheckAimCriteria(sum, dto.Type, dto.Amount) && CheckIfAimExpires(dto);
        }

        return result;
    }

    private bool CheckIfAimExpires(AimDto dto) => DateTime.Now.Date == dto.FinishDate.Date;

    private async Task CheckAimRecordings(AimDto dto)
    {
        if (dto.DateType == AimDateType.DailyCount || dto.DateType == AimDateType.DailyCount)
        {
            var sum = await GetSumOfOperations(dto, dto.CreationDate, DateTime.Now.Date);
            var result = CheckAimCriteria(sum, dto.Type, dto.Amount);
        }
    }

    private bool CheckAimCriteria(float sum, AimType type, float amount)
    {
        var result = false;
        if (type == AimType.IncreaseIncome)
        {
            result = sum > amount;
        }
        else if (type == AimType.ExpenseLess)
        {
            result = sum < amount;
        }

        return result;
    }


}