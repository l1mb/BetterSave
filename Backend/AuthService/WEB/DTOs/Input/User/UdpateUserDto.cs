using AuthServiceApp.WEB.DTOs.Output.User;

namespace AuthServiceApp.WEB.DTOs.Input.User
{
    public class UdpateUserDto
    {
        public UserDto UserDto { get; set; }
        public string[] unmodifiedProps;
    }
}
