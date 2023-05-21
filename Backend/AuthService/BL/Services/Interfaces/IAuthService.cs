using AuthServiceApp.BL.Helpers;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input;
using AuthServiceApp.WEB.DTOs.Output;
using AuthServiceApp.WEB.DTOs.User;
using AuthServiceApp.WEB.Settings;

namespace AuthServiceApp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> ConfirmAsync(string id, string token);
        Task SendConfirmationMessageAsync(string actionName, string controllerName, (SignUpOutputDto user, string confirmToken) data, string scheme);
        Task<ServiceResult<LoginOutDto>> SignInAsync(SignInDto userModel, AppSettings appSettings);
        Task<ServiceResult<(SignUpOutputDto user, string confirmToken)>> SignUpAsync(SignUpDto userModel);
    }
}