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


        public async Task<ActionResult<AimDto>> CreateAim(AimDto aimDto)
        {
            var result = await aimService.CreateAim(aimDto);
            return result;
        }


        public async Task<ActionResult<AimDto>> GetAim(Guid id)
        {
            var result = await aimService.GetAimById(id);
            return result;
        }

        public async Task<ActionResult<AimDto>> GetAimByUserId(Guid userId)
        {
            var result = await aimService.GetAimByUserId(userId);
            return result;
        }

        public async Task<ActionResult<AimDto>> DeleteAim(Guid Id)
        {
            var result = await aimService.Delete(Id);
            return result;
        }

    }
}
