using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.DAL.Interfaces
{
    public interface ISpendingRepository : IBaseRepository<Spending>
    {
        Task<IEnumerable<ShopPosition>> GetCategoriesSpendings(Guid cardId);
    }
}
