using AuthServiceApp.BL.Services.Operation;
using AuthServiceApp.WEB.DTOs.Operations;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OperationController: GenericController
    {
        private readonly IOperationService _operationService;

        public OperationController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> GetOperationsByUserId(Guid userId)
        {
            var result =await  _operationService.GetOperationsByUserIdAsync(userId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOperation(CreateOperationModel request)
        {
            var result = await _operationService.CreateOperationAsync(request);

            return CreatedAtAction(nameof(CreateOperation), result);
        }

        [HttpDelete("{operationId:guid}")]
        public async Task<IActionResult> DeleteOperation(Guid operationId)
        {
            await _operationService.DeleteOperationAsync(operationId);
            return NoContent();
        }
    }
}
