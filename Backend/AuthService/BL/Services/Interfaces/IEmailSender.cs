namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string emailToSend, string subject, string message);
        Task SendConfirmationEmailAsync(string recipient, string subject, string path, string token);
    }
}