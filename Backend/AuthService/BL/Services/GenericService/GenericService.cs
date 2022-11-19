using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Linq.Expressions;

namespace AuthServiceApp.BL.Services.GenericService
{
    public class GenericService<T> : IGenericService<T> where T : BaseEntity
    {
        private readonly IBaseRepository<T> _repository;

        public GenericService(IBaseRepository<T> repository)
        {
            _repository = repository;
        }

        public Task<T> CreateAsync(T entity) =>
             _repository.CreateItemAsync(entity);

        public Task<T> UpdateAsync(T entity) =>
            _repository.UpdateItemAsync(entity);
        public Task<T> UpdateWithModifiedAsync(T entity, params Expression<Func<T, object>>[] expressions) =>
            _repository.UpdateItemAsyncWithModified(entity, expressions);

        public Task<T> DeleteAsync(Guid id) =>
            _repository.RemoveItemAsync(T => T.Id == id);

        public Task<List<T>> GetAsync(Expression<Func<T, bool>> expression, Expression<Func<T, object>> sort) =>
            _repository.SearchForMultipleItemsAsync(expression, sort);

        public Task<T> GetOneAsync(Expression<Func<T, bool>> expression) =>
            _repository.SearchForSingleItemAsync(expression);

    }
}
