using AuthServiceApp.DAL.Entities.Categories;
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
