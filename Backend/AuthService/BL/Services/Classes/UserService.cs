using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.WEB.DTOs.Output.User;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using System.Linq.Expressions;
using System.Security.Claims;

namespace AuthServiceApp.BL.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, IUserRepository userRepository)
        {
            this._userManager = userManager; 
            this._mapper = mapper;
            this._userRepository = userRepository;
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

        public async Task<UserDto> GetUser(string userId)
        {


            var user = await _userManager.FindByIdAsync(userId);

            if(user is null)
            {
                throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.MissingUser);
            }

            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }

        public async Task<ServiceResult> PatchUser(JsonPatchDocument<ApplicationUser> patchDoc, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            patchDoc.ApplyTo(user);
            await _userManager.UpdateAsync(user);
            return new(ServiceResultType.Ok);
        }

        public async Task<ServiceResult> UpdateUser(UserDto userDto)
        {
            var user = _mapper.Map<ApplicationUser>(userDto);

            await _userRepository.UpdateUserAsync(user, userDto.Id.ToString());
         
            return new ServiceResult(ServiceResultType.Ok);
        }
    }
}
