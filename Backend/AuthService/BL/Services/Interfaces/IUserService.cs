using AuthServiceApp.BL.Helpers;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Output.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using System.Security.Claims;

namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUser(string userId);
        Task<ServiceResult> UpdateUser(UserDto userDto, string[] unmodiiedProps);
        Task<ServiceResult> DeleteAccount(Guid id);
        Task<ServiceResult<IdentityResult>> ChangePassword(Guid id, string password);
        Task<ServiceResult> PatchUser(JsonPatchDocument<ApplicationUser> patchDoc, string userId);
    }
}
