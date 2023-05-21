using System.ComponentModel.DataAnnotations;

namespace AuthServiceApp.WEB.DTOs.User
{
    public class SignUpDto
    {
        [Required(ErrorMessage = "The 'Email' field is required.")]
        [EmailAddress(ErrorMessage = "The 'Email' field is not a valid email address."), ]
        public string Email { get; set; }

        [Required(ErrorMessage = "The 'Password' field is required.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$", ErrorMessage = "Invalid password format")]
        public string Password { get; set; }
    }
}
