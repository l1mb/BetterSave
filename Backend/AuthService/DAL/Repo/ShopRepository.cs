using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;

namespace AuthServiceApp.DAL.Repo
{
    public class ShopRepository : BaseRepository<Shop>, IShopRepository
    {
        public ShopRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }
    }
}
