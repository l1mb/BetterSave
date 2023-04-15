namespace AuthServiceApp.WEB.DTOs.Input
{
    public class SignInDto
    {
        /// <example>admin@zxc.com</example>
        public string Email { get; set; }
        /// <example>Pa$$w0rd</example>
        public string Password { get; set; }
    }
}
