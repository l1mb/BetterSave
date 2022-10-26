﻿using AuthServiceApp.BL.Helpers;
using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.DAL.Interfaces
{
    public interface IUserRepository : IBaseRepository<ApplicationUser>
    {
        Task<ServiceResult<ApplicationUser>> FindUserByIdAsync(Guid id);
        Task<ServiceResult> UpdateUserPasswordAsync(Guid id, string password);
    }
}