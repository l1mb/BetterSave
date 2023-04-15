using AuthServiceApp.BL.Helpers;
using AuthServiceApp.DAL.Entities;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Interfaces
{
    public interface IUserRepository : IBaseRepository<ApplicationUser>
    {
        Task<ServiceResult<ApplicationUser>> FindUserByIdAsync(Guid id);
        Task<ServiceResult> UpdateUserPasswordAsync(Guid id, string password);
        Task<ServiceResult<ApplicationUser>> UpdateUserAsync(ApplicationUser appUser, string userId);
        Task<ApplicationUser> UpdateItemAsyncWithModified(ApplicationUser item, params Expression<Func<ApplicationUser, object>>[] modifiedProps);
        Task<List<(ApplicationUser, LoanEntity)>> GetUsersWithLoansBeforeTomorrow();
    }
}
