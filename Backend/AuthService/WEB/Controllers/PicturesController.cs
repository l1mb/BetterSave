using AuthServiceApp.BL.Services.Pictures.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private IPictureService _picturesService;
        public PicturesController(IPictureService picturesService)
        {
            _picturesService = picturesService; 
        }

        [HttpPost]
        public IActionResult GetTextFromPicture(IFormFile avatar)
        {
            var result = _picturesService.GetTextFromPicture(avatar);

            return Ok(result);
        }
    }
}
