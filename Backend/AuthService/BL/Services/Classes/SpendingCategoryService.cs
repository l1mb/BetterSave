using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Repo;

namespace AuthServiceApp.BL.Services.Classes
{
    public class SpendingCategoryService : ISpendingCategoryService
    {
        private readonly ISpendingCategoryRepository _spendingCategoryRepo;
        public SpendingCategoryService(ISpendingCategoryRepository spendingCategoryRepository)
        {
            _spendingCategoryRepo = spendingCategoryRepository;
        }
    }
}
