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
        Task<ServiceResult> UpdateUser(UserDto userDto);
        Task<ServiceResult> DeleteAccount(string id);
        Task<ServiceResult<IdentityResult>> ChangePassword(Guid id, string password);
        Task<ServiceResult> PatchUser(JsonPatchDocument<ApplicationUser> patchDoc, string userId);

        Task<List<string>> GetUserEmails(Expression<Func<ApplicationUser, bool>> expression);
        Task<List<(ApplicationUser, LoanEntity)>> GetUsersWithLoansBeforeTomorrow();
    }
}
