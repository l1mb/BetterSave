﻿using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using AuthServiceApp.BL.Mappers;

namespace AuthServiceApp.DAL.Repo
{
    public class UserRepository : BaseRepository<ApplicationUser>, IUserRepository
    {
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher;
        private readonly IPasswordValidator<ApplicationUser> _passwordValidator;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRepository(
            IPasswordValidator<ApplicationUser> passwordValidator,
            IPasswordHasher<ApplicationUser> passwordHasher,
            ApplicationDbContext databaseContext,
            UserManager<ApplicationUser> userManager) :
            base(databaseContext)
        {
            _passwordHasher = passwordHasher;
            _passwordValidator = passwordValidator;
            _userManager = userManager;
        }

        public async Task<ServiceResult<ApplicationUser>> UpdateUserAsync(ApplicationUser appUser, string userId)
        {
            var existingUser = await _userManager.FindByIdAsync(userId);
            existingUser.PhoneNumber = appUser.PhoneNumber;
            existingUser.FirstName = appUser.FirstName;
            existingUser.LastName = appUser.LastName;

            var updateResult = await _userManager.UpdateAsync(existingUser);
            if (!updateResult.Succeeded)
            {
                throw new ApplicationHelperException(ServiceResultType.ServerError, ExceptionMessageConstants.SaveIsImpossible);
            }
            var fullUser = await _userManager.FindByIdAsync(userId);

            return new(ServiceResultType.Ok, fullUser);
        }

        public async Task<ServiceResult> UpdateUserPasswordAsync(Guid userId, string newPassword)
        {
            var existingUser = await _userManager.FindByIdAsync(userId.ToString());

            var validateResult = await _passwordValidator.ValidateAsync(_userManager, existingUser, newPassword);

            if (!validateResult.Succeeded)
            {
                return new(ServiceResultType.ServerError, "Password validation error");
            }

            existingUser.PasswordHash = _passwordHasher.HashPassword(existingUser, newPassword);
            await _userManager.UpdateAsync(existingUser);

            return new(ServiceResultType.Ok);
        }
        public async Task<ServiceResult<ApplicationUser>> FindUserByIdAsync(Guid userId)
        {
            var users = await GetUserWithChildrenAsync(o => o.Id == userId);
            return new(ServiceResultType.Ok, users);
        }

        private async Task<ApplicationUser> GetUserWithChildrenAsync(Expression<Func<ApplicationUser, bool>> expression) => await Entity.AsNoTracking().Include(o => o.UserRoles).FirstOrDefaultAsync(expression);


        public async Task<List<(ApplicationUser, LoanEntity)>> GetUsersWithLoansBeforeTomorrow()
        {
            var users = Entity.Include(user => user.Loans);
            var neededUsers = await users
                .Where(user => user.Loans.Any(loan => loan.ReturnDate.Date == DateTime.Today.AddDays(1).Date))
                .ToListAsync();

            var arr = neededUsers.SelectMany(user =>
                user.Loans.Where(loan => loan.ReturnDate.Date == DateTime.Today.AddDays(1).Date).Select(loan => new
                {
                    Loan = loan,
                    User = user
                }));
            return arr.Select(x => (x.User, x.Loan)).ToList();

        }
    }
}
