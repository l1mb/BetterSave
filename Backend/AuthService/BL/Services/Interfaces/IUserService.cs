using AuthServiceApp.BL.Helpers;
using AuthServiceApp.WEB.DTOs.Output.User;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUser(ClaimsPrincipal principal);
        Task<ServiceResult> UpdateUser(UserDto userDto);
        Task<ServiceResult> DeleteAccount(Guid id);
        Task<ServiceResult<IdentityResult>> ChangePassword(Guid id, string password);
    }
}
