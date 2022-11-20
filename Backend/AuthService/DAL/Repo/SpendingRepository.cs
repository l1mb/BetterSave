using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.DAL.Repo;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Interfaces
{
    public class SpendingRepository : BaseRepository<Spending>, ISpendingRepository
    {
        public SpendingRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }


        public new async Task<List<Spending>> SearchForMultipleItemsAsync<TK>(
            Expression<Func<Spending, bool>> expression,
            int offset,
            int limit,
            Expression<Func<Spending, TK>> sort
        )
        {
            IQueryable<Spending> items;

            if (expression != null)
            {
                items = Entity
                    .Where(expression)
                    .OrderBy(sort)
                    .Skip(offset)
                    .Take(limit);
            }
            else
            {
                items = Entity
                    .OrderBy(sort)
                    .Skip(offset)
                    .Take(limit);
            }

            var res = await items
                    .AsNoTracking()
                    .Include(incl => incl.Shop)
                    .Include(incl => incl.ShopPositions)
                    .ThenInclude(incl => incl.SpendingCategory)
                    .ToListAsync();

            return res;
        }
    }
}
