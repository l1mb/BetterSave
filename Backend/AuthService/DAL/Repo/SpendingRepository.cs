using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.DAL.Repo;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Interfaces
{
    public class res
    {
        public string? Category;
        public float? Sum;
    }
    public class SpendingRepository : BaseRepository<Spending>, ISpendingRepository
    {
        public SpendingRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }



        public async Task<IEnumerable<ShopPosition>> GetCategoriesSpendings(Guid cardId)
        {
            FormattableString formattable = $"select Sum(sp.Price)[Price], Max(CONVERT(uniqueidentifier, sc.Id))[Id], sc.Name[Name], Max(sp.Currency)[Currency], Max(sp.SpendingCategoryId)[SpendingCategoryId], Min(sc.IsDeleted+0)[IsDeleted] from ShopPositions sp join SpendingCategories sc on sp.SpendingCategoryId = sc.Id join ShopPositionSpending sps on sps.ShopPositionsId = sp.Id join Spendings s on s.Id = sps.SpendingsId where CardId = '{cardId}' group by sc.Name";

            var result = await DbContext.ShopPositions.FromSqlInterpolated(formattable).ToListAsync();

            return result;
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
