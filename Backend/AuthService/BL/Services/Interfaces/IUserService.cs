using AuthServiceApp.BL.Helpers;
using AuthServiceApp.WEB.DTOs.Output.User;
using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUser(string id);
        Task<ServiceResult> UpdateUser(UserDto userDto);
        Task<ServiceResult> DeleteAccount(Guid id);
        Task<ServiceResult<IdentityResult>> ChangePassword(Guid id, string password);
    }
}
