using AuthServiceApp.BL.Enums;
using AuthServiceApp.Services.Interfaces;
using AuthServiceApp.WEB.DTOs.Input;
using AuthServiceApp.WEB.DTOs.Output;
using AuthServiceApp.WEB.Settings;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using System.Security.Claims;
using crypto;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Google.Apis.Auth;

namespace AuthServiceApp.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IAuthService _authService;

        public AuthController(AppSettings appSettings, IAuthService authService)
        {
            _appSettings = appSettings;
            _authService = authService;
        }

        [HttpGet("test")]
        public IActionResult test()
        {
            return Ok("It's okay");
        }

        /// <summary>
        ///     Creates a new user in database and sends him a confirmation link
        /// </summary>
        /// <param name="userModel">User data transfer object</param>
        /// <returns>Returns a new user from database</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>
        [HttpPost("sign-up")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> SignUp([FromBody] SignUpDto userModel)
        {
            var signUpResult = await _authService.SignUpAsync(userModel);

            if (signUpResult.Result is not ServiceResultType.Ok)
            {
                return BadRequest(signUpResult.ErrorMessage);
            }

            await _authService.SendConfirmationMessageAsync(nameof(ConfirmEmail), "Auth",
                (signUpResult.Data.user, signUpResult.Data.confirmToken), Request.Scheme);

            return CreatedAtAction(nameof(SignUp), signUpResult.Data.user);
        }


        /// <summary>
        ///     Returns a new JWT token to registered users
        /// </summary>
        /// <param name="userModel">User data transfer object</param>
        /// <returns>Returns a new JWT token</returns>
        /// <response code="200">Token is generated</response>
        /// <response code="400">Unable to authenticate with provided email or password</response>
        [HttpPost("sign-in")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> SignIn([FromBody] SignInDto userModel)
        {
            var signInResult = await _authService.SignInAsync(userModel, _appSettings);

            if (signInResult.Result is not ServiceResultType.Ok)
            {
                return StatusCode((int)signInResult.Result, signInResult.ErrorMessage);
            }

            return Ok(signInResult.Data);
        }

        /// <summary>
        ///     Confirms user email
        /// </summary>
        /// <param name="id">User id</param>
        /// <param name="token">Email confirmation token</param>
        /// <returns>No content</returns>
        /// <response code="204">Email confirmed successfully</response>
        /// <response code="400">Email cannot be confirmed</response>
        [HttpGet("email-confirmation")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ConfirmEmail(string id, string token)
        {
            var confirmResult = await _authService.ConfirmAsync(id, token);
            if (confirmResult.Result is not ServiceResultType.Ok)
            {
                return StatusCode((int)confirmResult.Result, confirmResult.ErrorMessage);
            }

            return Ok("Confirmed");
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<IActionResult> Google([FromBody] GoogleAuthUser userView)
        {
            try
            {
                //SimpleLogger.Log("userView = " + userView.tokenId);
                var payload = GoogleJsonWebSignature.ValidateAsync(userView.tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                var user = await _authService.SignInAsync(new SignInDto(), _appSettings);

               
                return Ok(new
                {
                    token = user
                });
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
            return BadRequest();
        }

    }
}
