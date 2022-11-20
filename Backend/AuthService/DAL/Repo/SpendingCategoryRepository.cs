using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;

namespace AuthServiceApp.DAL.Repo
{
    public class SpendingCategoryRepository : BaseRepository<SpendingCategory>, ISpendingCategoryRepository
    {
        public SpendingCategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }
    }
}
