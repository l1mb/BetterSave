using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;

namespace AuthServiceApp.BL.Services.Aim
{
    public interface IAimService : IGenericService<AimEntity>
    {
        Task<AimDto> CreateAim(AimDto dto);
        Task<GetAimDto> GetAimByUserId(Guid id);
        Task<AimDto> GetAimById(Guid id);
        Task<AimDto> Delete(Guid id);
        Task<AimDto> UpdateAsync(UpdateAimDto id);
        Task<List<AimDto>> GetAllActiveAims();
        Task MainAimFunction(AimDto dto);
        Task<AimProgressDto> GetProgressAsync(string userId);
    }
}