using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.WEB.DTOs.Output.User;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace AuthServiceApp.BL.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this._userManager = userManager; 
            this._mapper = mapper;
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

        public async Task<ServiceResult> DeleteAccount(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            
            if(user is null)
            {
                throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.MissingUser);
            }

            await _userManager.DeleteAsync(user);

            return new(ServiceResultType.Ok);
        }

        public async Task<UserDto> GetUser(ClaimsPrincipal principal)
        {
            var claims = IdentityExtractor.GetValue(principal);
            var UserIdClaim = claims.Where(claim => (string)claim.Type == "UserId").SingleOrDefault();
            if (UserIdClaim is null)
            {
                throw new ApplicationHelperException(ServiceResultType.InvalidData, ExceptionMessageConstants.TokenIsBroken);
            }

            var user = await _userManager.FindByIdAsync(UserIdClaim.Value);

            if(user is null)
            {
                throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.MissingUser);
            }

            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }

        public async Task<ServiceResult> UpdateUser(UserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(userDto.Id.ToString());
            var identityResult = await _userManager.UpdateAsync(user);
            if (!identityResult.Succeeded)
            {
                throw new ApplicationHelperException(ServiceResultType.ServerError, identityResult.Errors.First().Description);
            }

            return new ServiceResult(ServiceResultType.Ok);
        }


    }
}
