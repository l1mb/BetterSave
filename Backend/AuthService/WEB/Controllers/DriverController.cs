using AuthServiceApp.BL.Services.ServiceManagement;
using AuthServiceApp.WEB.DTOs.Driver;
using Hangfire;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DriverController: GenericController
    {
        private static List<Driver> drivers = new List<Driver>();

        public DriverController()
        {
            
        }

        [HttpPost]
        public IActionResult AddDriver(Driver driver)
        {
            if (ModelState.IsValid)
            {
                drivers.Add(driver);
                return CreatedAtAction("GetDriver", new { driver.Id }, driver);
            }

            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetDriver(Guid Id)
        {
            var driver = drivers.FirstOrDefault(x => x.Id == Id);
            var jobId = BackgroundJob.Enqueue< IServiceManagement>(x => x.SyncData());
            return Ok(driver);
        }
    }
}
    