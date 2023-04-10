using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.WEB.DTOs.Roles;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/roles")]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService roleService;
        public RolesController(IRoleService roleService)
        {
            this.roleService = roleService;
        }
        [HttpPost]
        public async Task<IActionResult> AddRoles(RoleDto roles)
        {
            var result = await roleService.CreateAsync(roles);
            if(result.Result is not ServiceResultType.Created)
            {
                return BadRequest(result.Result);
            }
            return Ok();

        }
    }
}
