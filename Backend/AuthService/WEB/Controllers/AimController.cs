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
        private
        public AimController()
        {

        }

        public Task<ActionResult> CreateAim(AimDto aimDto)
        {

        }
    }
}
