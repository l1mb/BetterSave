﻿using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.WEB.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using MimeKit.Utils;

namespace GameStore.WEB.Utilities
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

        public async Task SendTestEmailAsync(string emailToSend)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress(_appSettings.SmtpClientSettings.EmailName,
                _appSettings.SmtpClientSettings.EmailAddress));
            email.To.Add(new MailboxAddress(string.Empty, emailToSend));

            email.Subject = "Message subject";

            var builder = new BodyBuilder();

            builder.HtmlBody = File.ReadAllText("D:\\University\\4\\1\\Diploma\\Backend\\Email\\index.html");
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