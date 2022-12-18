using AuthServiceApp.BL.Services.Aim;
using AuthServiceApp.BL.Services.Card;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AimController : GenericController<AimEntity>
    {
        private readonly IAimService aimService;
        public AimController(IAimService aimService)
        {
            this.aimService = aimService;
        }


        [HttpPost("/api/aim")]
        public async Task<ActionResult<AimDto>> CreateAim(AimDto aimDto)
        {
            var result = await aimService.CreateAim(aimDto);
            return result;
        }

        [HttpGet("/api/aim/{id}")]
        public async Task<ActionResult<AimDto>> GetAim(Guid id)
        {
            var result = await aimService.GetAimById(id);
            return result;
        }

        [HttpGet("/api/aim/user/{userId}")]
        public async Task<ActionResult<GetAimDto>> GetAimByUserId(Guid userId)
        {
            var result = await aimService.GetAimByUserId(userId);
            return result;
        }

        [HttpDelete("/api/aim/{id}")]
        public async Task<ActionResult> DeleteAim(Guid Id)
        {
            await aimService.Delete(Id);
            return NoContent();
        }

    }
}
