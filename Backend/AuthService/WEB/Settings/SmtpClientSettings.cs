using System.ComponentModel.DataAnnotations;

namespace AuthServiceApp.WEB.Settings
{
    public class SmtpClientSettings
    {
        [Required] public string Host { get; set; }

        public int Port { get; set; }

        [Required] public string EmailName { get; set; }

        [Required] public string EmailAddress { get; set; }

        [Required] public string Password { get; set; }

        public bool UseSsl { get; set; }

        public void Validate()
        {
            Validator.ValidateObject(this, new(this), true);
        }
    }
}