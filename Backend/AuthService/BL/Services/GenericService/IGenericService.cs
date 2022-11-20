using System.Linq.Expressions;

namespace AuthServiceApp.BL.Services.GenericService
{
    public interface IGenericService<T>
    {
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> UpdateWithModifiedAsync(T entity, params Expression<Func<T, object>>[] expressions);
        Task<T> DeleteAsync(Guid id);
        Task<List<T>> GetAsync(Expression<Func<T, bool>> expression, Expression<Func<T, object>> sort);
        Task<T> GetOneAsync(Expression<Func<T, bool>> expression);

    }
}