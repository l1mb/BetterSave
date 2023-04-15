using AuthServiceApp.BL.Services.Interfaces;

namespace AuthServiceApp.BL.Services.ServiceManagement
{
    public class ServiceManagement:IServiceManagement
    {
        private readonly IUserService _userService;
        private readonly IEmailSender _emailSender;
        public ServiceManagement(IUserService userService, IEmailSender emailSender)
        {
            _userService = userService;
            _emailSender = emailSender;
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

    }
}
