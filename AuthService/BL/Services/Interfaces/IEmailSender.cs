namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string accountConfirmation, string v);
        Task SendConfirmationEmailAsync(string recipient, string subject, string path, string token);
    }
}