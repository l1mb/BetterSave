using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.Migrations;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Repo.Card
{
    public class CardRepository : BaseRepository<CardEntity>, ICardRepository
    {
        public CardRepository(ApplicationDbContext databaseContext) : base(databaseContext)
        {
        }

        public async Task<BaseEntity> SoftDeleteAsync(Expression<Func<CardEntity, bool>> expression)
        {
            try
            {
                var item = await SearchForSingleItemAsync(expression);

                item.IsDeleted = true;
                Entity.Update(item);

                await DbContext.SaveChangesAsync();
                DbContext.Entry(item).State = EntityState.Detached;

                return item;
            }
            catch (Exception e)
            {
                throw new ApplicationHelperException(ServiceResultType.InvalidData, e.Message);
            }
        }
    }
}
