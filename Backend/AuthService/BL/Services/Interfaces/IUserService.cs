using System.Linq.Expressions;
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
        Task<ServiceResult> UpdateUserAsync(UserDto userDto, Guid userId);
        Task<ServiceResult> DeleteAccount(string id);
        Task ChangePassword(string id, string password);
        Task<ServiceResult> PatchUser(JsonPatchDocument<ApplicationUser> patchDoc, string userId);

        Task<List<string>> GetUserEmails(Expression<Func<ApplicationUser, bool>> expression);
        Task<List<(ApplicationUser, LoanEntity)>> GetUsersWithLoansBeforeTomorrow();
        Task ChangeUserPassword(string password, string userId);
    }
}
