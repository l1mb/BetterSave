using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.WEB.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using MimeKit.Utils;

namespace AuthServiceApp.WEB.Utilities
{
    public class EmailSender : IEmailSender
    {
        private readonly AppSettings _appSettings;

        public EmailSender(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        public async Task SendEmailAsync(string emailToSend, string subject, string message)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress(_appSettings.SmtpClientSettings.EmailName,
                _appSettings.SmtpClientSettings.EmailAddress));
            email.To.Add(new MailboxAddress(string.Empty, emailToSend));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = message
            };

            using var smtpClient = new SmtpClient();

            await smtpClient.ConnectAsync(_appSettings.SmtpClientSettings.Host, _appSettings.SmtpClientSettings.Port,
                SecureSocketOptions.StartTls);
            await smtpClient.AuthenticateAsync(_appSettings.SmtpClientSettings.EmailAddress,
                _appSettings.SmtpClientSettings.Password);
            await smtpClient.SendAsync(email);
            await smtpClient.DisconnectAsync(true);
        }

        public async Task SendConfirmationEmailAsync(string recipient, string subject, string htmlPath, string token)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress(_appSettings.SmtpClientSettings.EmailName,
                _appSettings.SmtpClientSettings.EmailAddress));
            email.To.Add(new MailboxAddress(string.Empty, recipient));

            email.Subject = subject;


            var t = File.ReadAllText(htmlPath);
            var k = t.IndexOf("a id=`secret`");
            var res = t.Insert(k + 13, $" href={token} ");
            var builder = new BodyBuilder
            {
                HtmlBody = res
            };
            email.Body = builder.ToMessageBody();

            using var smtpClient = new SmtpClient();

            await smtpClient.ConnectAsync(_appSettings.SmtpClientSettings.Host, _appSettings.SmtpClientSettings.Port,
                SecureSocketOptions.StartTls);
            await smtpClient.AuthenticateAsync(_appSettings.SmtpClientSettings.EmailAddress,
                _appSettings.SmtpClientSettings.Password);
            await smtpClient.SendAsync(email);
            await smtpClient.DisconnectAsync(true);
        }
    }
}