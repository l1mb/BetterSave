using AuthServiceApp.BL.Helpers;
using AuthServiceApp.WEB.DTOs.Output.User;

namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUser(); 
        Task<ServiceResult> UpdateUser();
        Task<ServiceResult> DeleteAccount();
        Task<ServiceResult> ChangePassword();
    }
}
