using AuthServiceApp.BL.Services.Aim;
using AuthServiceApp.BL.Services.Card;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/aim")]
    public class AimController : GenericController
    {
        private readonly IAimService aimService;
        public AimController(IAimService aimService)
        {
            this.aimService = aimService;
        }


        [HttpPost]
        public async Task<ActionResult<AimDto>> CreateAim(AimDto aimDto)
        {
            var result = await aimService.CreateAim(aimDto);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AimDto>> GetAim(Guid id)
        {
            var result = await aimService.GetAimById(id);
            return result;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<GetAimDto>> GetAimByUserId(Guid userId)
        {
            var result = await aimService.GetAimByUserId(userId);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAim(Guid Id)
        {
            await aimService.Delete(Id);
            return NoContent();
        }

    }
}
