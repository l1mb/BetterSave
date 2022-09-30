using AuthServiceApp.BL;
using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.Services.Interfaces;
using AuthServiceApp.WEB.DTOs.Input;
using AuthServiceApp.WEB.DTOs.Output;
using AuthServiceApp.WEB.Settings;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Web;

namespace AuthServiceApp.Services.Classes
{
    public class AuthService : IAuthService
    {
        public const string AccountConfirmation = "Account confirmation";
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;
        private readonly IRoleService _roleService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUrlHelper _urlHelper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;

        public AuthService(UserManager<ApplicationUser> userManager, IUserRepository userRepository,
            SignInManager<ApplicationUser> signInManager, IMapper mapper, IRoleService roleService,
            IUrlHelper urlHelper, IEmailSender emailSender)
        {
            _userRepository = userRepository;
            _emailSender = emailSender;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _roleService = roleService;
            _urlHelper = urlHelper;
        }

        public async Task<ServiceResult<string>> SignInAsync(SignInDto basicUserModel, AppSettings appSettings)
        {
            var user = await _userManager.FindByEmailAsync(basicUserModel.Email);
            if (user is null)
            {
                return new(ServiceResultType.IncorrectData, ExceptionMessageConstants.MissingUser);
            }

            var userRoleList = await _userManager.GetRolesAsync(user);
            var userRole = userRoleList.FirstOrDefault();

            if (string.IsNullOrWhiteSpace(userRole))
            {
                return new(ServiceResultType.IncorrectData);
            }

            if (!user.EmailConfirmed)
            {
                return new(ServiceResultType.ServerError, "Please confirm your email");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, basicUserModel.Password, false);
            if (!result.Succeeded)
            {
                return new(ServiceResultType.IncorrectData);
            }

            var tokenGenerator = new TokenGenerator(appSettings);
            var token = tokenGenerator.GenerateAccessToken(user.Id, user.UserName, userRole);

            return new(ServiceResultType.Ok, data: token);
        }


        public async Task SendConfirmationMessageAsync(string actionName, string controllerName,
            (SignUpOutputDto user, string confirmToken) data, string scheme)
        {
            var confirmationLink =
                _urlHelper.Action(actionName, controllerName, new { data.user.Id, data.confirmToken }, scheme);

            await _emailSender.SendEmailAsync(data.user.Email, AccountConfirmation,
                $"<a href='{confirmationLink}'>confirm</a>");
        }

        public async Task<ServiceResult> ConfirmAsync(string id, string token)
        {
            var user = await _userManager.FindByIdAsync(id);

            var isEmailConfirmed = await _userManager.ConfirmEmailAsync(user, HttpUtility.UrlDecode(token));

            return !isEmailConfirmed.Succeeded
                ? new(ServiceResultType.ServerError)
                : new ServiceResult(ServiceResultType.Ok);
        }

        public async Task<ServiceResult> UpdateUserPasswordAsync(ApplicationUser user, SignUpDto updateUserModel)
        {
            var passwordUpdateResult = await _userRepository.UpdateUserPasswordAsync(user.Id, updateUserModel.Password);

            //_cacheService.RemoveEntity(user.Id);

            return passwordUpdateResult;
        }



        public async Task<ServiceResult<ApplicationUser>> GetUserAsync(Guid id)
        {


            var userSearchResult = await _userRepository.FindUserByIdAsync(id);
            if (userSearchResult.Result is not ServiceResultType.Ok)
            {
                return new(ServiceResultType.NotFound, ExceptionMessageConstants.MissingUser);
            }


            return userSearchResult;
        }

        public async Task<ServiceResult<(SignUpOutputDto user, string confirmToken)>> SignUpAsync(SignUpDto userModel)
        {
            var previousUser = await _userManager.FindByEmailAsync(userModel.Email);
            if (previousUser is not null)
            {
                return new(ServiceResultType.IncorrectData,
                    "User with same email already exists");
            }

            var user = _mapper.Map<ApplicationUser>(userModel);
            var result = await _userManager.CreateAsync(user, userModel.Password);
            if (!result.Succeeded)
            {
                return new(ServiceResultType.ServerError,
                    result.Errors.Last().Description);
            }

            var identityUser = await _userManager.FindByEmailAsync(user.Email);

            var confirmToken = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
            var confirmTokenEncoded = HttpUtility.UrlEncode(confirmToken);

            await _roleService.EditAsync(new(UserRoleConstants.User, user.Email));
            await _signInManager.SignInAsync(identityUser, false);

            var newUser = _mapper.Map<SignUpOutputDto>(userModel);

            return new(ServiceResultType.Ok,
                (newUser, confirmTokenEncoded));
        }
    }
}
