using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.WEB.DTOs.Output.User;
using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.BL.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public UserService()
        {

        }
        public async Task<ServiceResult<IdentityResult>> ChangePassword(Guid id, string password)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, password);
            if(!result.Succeeded)
            {
                throw new ApplicationHelperException(ServiceResultType.ServerError, result.Errors.First().Description);
            }
            return new(ServiceResultType.Ok);
        }

        public Task<ServiceResult> DeleteAccount()
        {
            throw new NotImplementedException();
        }

        public Task<UserDto> GetUser()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult> UpdateUser()
        {
            throw new NotImplementedException();
        }
    }
}
