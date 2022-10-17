namespace AuthServiceApp.WEB.DTOs.Input
{
    public class SignUpDto : SignInDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
    }
}
