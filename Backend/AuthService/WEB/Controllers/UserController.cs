using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize(AuthenticationSchemes = AuthSchemes)]
    public class UserController : ControllerBase
    {
        private const string AuthSchemes =
       GoogleDefaults.AuthenticationScheme;
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(this.User.Identity);
        }
    }
}
