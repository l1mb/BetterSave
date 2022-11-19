using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Aim;

namespace AuthServiceApp.BL.Services.Aim
{
    public interface IAimService : IGenericService<AimEntity>
    {
        Task<AimDto> CreateAim(AimDto dto);
        Task<AimDto> GetAimByUserId(Guid id);
        Task<AimDto> GetAimById(Guid id);
        Task<AimDto> Delete(Guid id);
        Task<AimDto> UpdateAsync(Guid id);
    }
}