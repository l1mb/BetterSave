namespace AuthServiceApp.WEB.DTOs.Output
{
    public class SignUpOutputDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email{ get; set; }
    }
}
