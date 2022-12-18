using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Output.User;
using AuthServiceApp.WEB.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
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
            var userId = ClaimHelper.GetUserId(User);

            var res = await _userService.GetUser(userId);

            return res;
        }

        [HttpPut("api/user")]
        [Authorize]
        public async Task<ActionResult> UpdateUser([FromBody] UserDto updateUserDto)
        {
            await _userService.UpdateUser(updateUserDto);

            return NoContent();
        }

        [HttpPatch("api/user")]
        [Authorize]
        public async Task<ActionResult> PatchUser([FromBody] JsonPatchDocument<ApplicationUser> patchDoc)
        {
            var userId = ClaimHelper.GetUserId(User);
            await _userService.PatchUser(patchDoc, userId);

            return NoContent();
        }

        [HttpDelete("api/user")]
        [Authorize]
        public async Task<ActionResult> PatchUser()
        {
            var userId = ClaimHelper.GetUserId(User);
            await _userService.DeleteAccount(userId);

            return NoContent();
        }
    }
}
