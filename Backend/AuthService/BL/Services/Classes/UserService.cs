using System.Linq.Expressions;
using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Output.User;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;

namespace AuthServiceApp.BL.Services.Classes;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, IUserRepository userRepository)
    {
        _userManager = userManager;
        _mapper = mapper;
        _userRepository = userRepository;
    }

    public async Task ChangePassword(string id, string password)
    {
        var user = await _userManager.FindByIdAsync(id);

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var result = await _userManager.ResetPasswordAsync(user, token, password);
        if (!result.Succeeded)
            throw new ApplicationHelperException(ServiceResultType.ServerError, result.Errors.First().Description);
    }


    public async Task<ServiceResult> DeleteAccount(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user is null)
            throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.MissingUser);

        await _userManager.DeleteAsync(user);

        return new(ServiceResultType.Ok);
    }

    public async Task<UserDto> GetUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.MissingUser);

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


    public async Task<List<string>> GetUserEmails(Expression<Func<ApplicationUser, bool>> expression)
    {
        var result = await _userRepository.SearchForMultipleItemsAsync(expression, order => order.Email);

        return result.Select(x => x.Email).ToList();
    }

    public async Task<List<(ApplicationUser, LoanEntity)>> GetUsersWithLoansBeforeTomorrow()
    {
        var result = await _userRepository.GetUsersWithLoansBeforeTomorrow();

        return result;
    }

    public async Task ChangeUserPassword(string password, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user is null)
        {
            throw new ApplicationHelperException(ServiceResultType.NotFound, "User is not found");
        }
        user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, password);
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            throw new ApplicationHelperException(ServiceResultType.InvalidData,
                ExceptionMessageConstants.SaveIsImpossible);
        }
    }

    public async Task<ServiceResult> UpdateUserAsync(UserDto userDto, Guid userId)
    {
        var prevUser = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId);
        if (prevUser is null)
            throw new ApplicationHelperException(ServiceResultType.InvalidData,
                ExceptionMessageConstants.MissingUser);

        _mapper.Map(userDto, prevUser);

        await _userRepository.UpdateItemAsync(prevUser);

        return new(ServiceResultType.Ok);
    }
}