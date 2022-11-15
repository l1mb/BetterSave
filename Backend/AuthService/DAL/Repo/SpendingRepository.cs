using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.DAL.Repo;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Interfaces
{
    public class SpendingRepository : BaseRepository<Spending>, ISpendingRepository
    {
        public SpendingRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

    }
}
