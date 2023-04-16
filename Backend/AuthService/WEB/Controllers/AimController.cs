using AuthServiceApp.BL.Services.Aim;
using AuthServiceApp.BL.Services.Card;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AimController : GenericController
    {
        private readonly IAimService _aimService;
        public AimController(IAimService aimService)
        {
            this._aimService = aimService;
        }

        [HttpPost]
        public async Task<ActionResult<AimDto>> CreateAim(AimDto aimDto)
        {
            var result = await _aimService.CreateAim(aimDto);
            return result;
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AimDto>> GetAim(Guid id)
        {
            var result = await _aimService.GetAimById(id);
            return result;
        }

        /// <summary>
        /// Get list of aims by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("user/{userId:guid}")]
        public async Task<ActionResult<GetAimDto>> GetAimByUserId(Guid userId)
        {
            var result = await _aimService.GetAimByUserId(userId);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteAim(Guid id)
        {
            await _aimService.Delete(id);
            return NoContent();
        }

    }
}
