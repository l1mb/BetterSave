namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string accountConfirmation, string v);
    }
}