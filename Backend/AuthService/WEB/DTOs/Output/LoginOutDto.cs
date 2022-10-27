using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.WEB.DTOs.Output
{
    public class LoginOutDto
    {
        public LoginOutDto(ApplicationUser user, string token)
        {
            User = user;
            this.token = token;
        }

        public ApplicationUser User { get; set; }
        public string token { get; set; }
    }
}
