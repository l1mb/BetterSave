using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Services.Aim;
using AuthServiceApp.BL.Services.AimRecording;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.BL.Services.Operation;
using AuthServiceApp.WEB.DTOs.Aim;
using AuthServiceApp.WEB.DTOs.Operations;

namespace AuthServiceApp.BL.Services.ServiceManagement;

public class ServiceManagement : IServiceManagement
{
    private readonly IUserService _userService;
    private readonly IEmailSender _emailSender;
    private readonly IAimService _aimService;
    private readonly IOperationService _operationService;
    private readonly IAimRecordingService _recordingService;

    public ServiceManagement(IUserService userService, IEmailSender emailSender, IAimService aimService,
        IOperationService operationService, IAimRecordingService recordingService)
    {
        _userService = userService;
        _emailSender = emailSender;
        _aimService = aimService;
        _operationService = operationService;
        _recordingService = recordingService;
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
        var daily = allRecordings.Where(x => x.DateType == AimDateType.DailyCount).ToList();

        var dailyToDate = allRecordings.Where(x => x.DateType == AimDateType.DailyToDate).ToList();
        var toDate = allRecordings.Where(x => x.DateType == AimDateType.ToDate).ToList();

        var operations = new List<Task>();

        daily.ForEach(x =>
        {
            operations.Add(_aimService.MainAimFunction(x));
        });
        dailyToDate.ForEach(x =>
        {
            operations.Add(_aimService.MainAimFunction(x));
        });
        toDate.ForEach(x =>
        {
            operations.Add(_aimService.MainAimFunction(x));
        });

        await Task.WhenAll(operations);
    }
}