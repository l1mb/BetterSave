using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;

namespace AuthServiceApp.BL.Services.Aim
{
    public interface IAimService : IGenericService<AimEntity>
    {
        Task<AimDto> CreateAimAsync(AimDto dto);
        Task<List<GetAimDto>> GetAimByUserIdAsync(Guid id);
        Task<AimDto> GetAimByIdAsync(Guid id);
        Task<AimDto> DeleteAimAsync(Guid id);
        Task<AimDto> UpdateAimAsync(UpdateAimDto id);
        Task<List<AimDto>> GetAllActiveAimsAsync();
        Task CheckAimMainFuncAsync(AimDto dto);
        Task<List<AimProgressDto>> GetProgressAsync(string userId);
    }
}