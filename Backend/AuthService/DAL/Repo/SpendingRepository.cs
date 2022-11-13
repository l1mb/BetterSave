using AuthServiceApp.DAL.Entities;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Interfaces
{
    public class SpendingRepository : ISpendingRepository
    {
        public Task<Spending> CreateItemAsync(Spending entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Spending>> CreateItemsAsync(IEnumerable<Spending> items)
        {
            throw new NotImplementedException();
        }

        public Task<List<Spending>> SearchForMultipleItemsAsync<TK>(Expression<Func<Spending, bool>> expression, Expression<Func<Spending, TK>> sort)
        {
            throw new NotImplementedException();
        }

        public Task<List<Spending>> SearchForMultipleItemsAsync<TK>(Expression<Func<Spending, bool>> expression, int offset, int limit, Expression<Func<Spending, TK>> sort)
        {
            throw new NotImplementedException();
        }

        public Task<Spending> SearchForSingleItemAsync(Expression<Func<Spending, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<Spending> SearchForSingleItemAsync(Expression<Func<Spending, bool>> expression, params Expression<Func<Spending, object>>[] includes)
        {
            throw new NotImplementedException();
        }

        public Task<Spending> UpdateItemAsync(Spending item, params Expression<Func<Spending, object>>[] unmodifiedProperties)
        {
            throw new NotImplementedException();
        }
    }
}
