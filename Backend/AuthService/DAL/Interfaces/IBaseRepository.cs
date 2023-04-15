using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression);

        Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression,
            params Expression<Func<T, object>>[] includes);

        Task<T> CreateItemAsync(T entity);
        Task<T> CreateItemAsyncAsNoTracking(T entity);

        Task<List<T>> CreateItemsAsync(IEnumerable<T> items);

        Task<List<T>> SearchForMultipleItemsAsync<TK>
        (
            Expression<Func<T, bool>> expression,
            Expression<Func<T, TK>> sort
        );

        Task<List<T>> SearchForMultipleItemsAsync<TK>
        (
            Expression<Func<T, bool>> expression,
            int offset,
            int limit,
            Expression<Func<T, TK>> sort
        );

        Task<T> UpdateItemAsync(T item, params Expression<Func<T, object>>[] unmodifiedProperties);
        Task<T> UpdateItemAsync(T item);

        Task<T> UpdateItemAsyncWithModified(T item, params Expression<Func<T, object>>[] modifiedProperties);
        Task<T> RemoveItemAsync(Expression<Func<T, bool>> expression);

    }
}