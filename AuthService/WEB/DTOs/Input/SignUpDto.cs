namespace AuthServiceApp.WEB.DTOs.Input
{
    public class SignUpDto : SignInDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }

    }
}
