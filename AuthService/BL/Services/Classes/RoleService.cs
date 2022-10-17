using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Roles;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.BL.Services.Classes
{
    public class RoleService : IRoleService
    {
        private readonly IMapper _mapper;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoleService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager,
            IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<ServiceResult> CreateAsync(RoleDto roleDto)
        {
            var applicationRole = _mapper.Map<ApplicationRole>(roleDto);

            var result = await _roleManager.CreateAsync(applicationRole);
            if (!result.Succeeded)
            {
                return new(ServiceResultType.ServerError);
            }

            return new(ServiceResultType.Ok);
        }

        public async Task<ServiceResult> DeleteAsync(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role is null)
            {
                return new(ServiceResultType.NotFound);
            }

            var res = await _roleManager.DeleteAsync(role);
            if (!res.Succeeded)
            {
                return new(ServiceResultType.ServerError);
            }

            return new(ServiceResultType.Ok);
        }

        public async Task<ServiceResult> EditAsync(UserRoleDto basicUserRoleModel)
        {
            var user = await _userManager.FindByEmailAsync(basicUserRoleModel.Email);
            if (user is null)
            {
                return new(ServiceResultType.NotFound);
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            await _userManager.RemoveFromRolesAsync(user, userRoles);

            var identityRole = await _roleManager.FindByNameAsync(basicUserRoleModel.Role);
            if (identityRole is null)
            {
                await CreateAsync(new(basicUserRoleModel.Role));
            }

            await _userManager.AddToRoleAsync(user, basicUserRoleModel.Role);

            return new(ServiceResultType.Ok);
        }
    }
}
