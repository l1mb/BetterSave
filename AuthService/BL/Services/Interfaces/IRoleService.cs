using AuthServiceApp.BL.Helpers;
using AuthServiceApp.WEB.DTOs.Roles;

namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IRoleService
    {
        Task<ServiceResult> CreateAsync(RoleDto roleDto);
        Task<ServiceResult> DeleteAsync(string id);
        Task<ServiceResult> EditAsync(UserRoleDto basicUserRoleModel);
    }
}