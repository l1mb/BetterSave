using AuthServiceApp.WEB.DTOs.Input;

namespace AuthServiceApp.WEB.DTOs.Roles
{
    public class UserRoleDto : SignUpDto
    {
        public UserRoleDto(string role, string email)
        {
            Role = role;
            Email = email;
        }

        /// <summary>
        /// Name of user's role
        /// </summary>
        /// <example>admin</example>
        public string Role { get; set; }
    }
}
