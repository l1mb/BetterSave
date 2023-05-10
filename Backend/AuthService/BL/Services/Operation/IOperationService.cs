using AuthServiceApp.BL.Enums;
using AuthServiceApp.WEB.DTOs.Operations;

namespace AuthServiceApp.BL.Services.Operation;

public interface IOperationService
{
    public Task<IEnumerable<OperationModel>> GetOperationsByAccountAsync(Guid accountId);
    public Task<IEnumerable<OperationModel>> GetOperationsByUserIdAsync(Guid userId);
    public Task<OperationModel> CreateOperationAsync(CreateOperationModel model);
    public Task DeleteOperationAsync(Guid operationId);
    Task<List<PieDto>> GetOperationPieByUserId(Guid userId, OperationTypes operationTypes);
}