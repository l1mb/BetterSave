using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.WEB.DTOs.Output.User;
using AuthServiceApp.WEB.Settings;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IUserService _userService;
        public UserController(IUserService userService, AppSettings appSettings)
        {
            this._userService = userService;
            this._appSettings = appSettings;
        }
        [HttpGet("api/user")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetInfoAboutUser()
        {


            var res = await _userService.GetUser(this.User);

            return res;
        }
    }
}
