using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo.Card;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Repo
{
    public interface ICardRepository : IBaseRepository<CardEntity>
    {
        Task<BaseEntity?> SoftDeleteAsync(Expression<Func<CardEntity, bool>> expression);
    }
}