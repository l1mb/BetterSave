using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AuthServiceApp.DAL.Repo
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ApplicationDbContext DbContext;
        protected readonly DbSet<T> Entity;

        protected BaseRepository(ApplicationDbContext databaseContext)
        {
            DbContext = databaseContext;
            Entity = DbContext.Set<T>();
        }


        public async Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression)
        {
            var item = await Entity.AsNoTracking().SingleOrDefaultAsync(expression);

            return item;
        }

        public async Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression,
            params Expression<Func<T, object>>[] includes)
        {
            try
            {
                var query = Entity.Where(expression).AsNoTracking();

                if (includes.Length != 0)
                {
                    query = includes
                        .Aggregate(query,
                            (
                                current, includeProperty) => current.Include(includeProperty)
                        );
                }

                var item = await query.SingleOrDefaultAsync();

                return item;
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex);
                throw new InvalidOperationException($"More then one item has been found. Error: {ex.Message}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new($"Unable to find item in database. Error: {e.Message}");
            }
        }

        public virtual async Task<T> CreateItemAsync(T entity)
        {
            var createdEntity = await DbContext.AddAsync(entity);

            await DbContext.SaveChangesAsync();

            createdEntity.State = EntityState.Detached;

            return createdEntity.Entity;
        }

        public async Task<List<T>> CreateItemsAsync(IEnumerable<T> items)
        {
            var entitiesList = items.ToList();

            try
            {
                await Entity.AddRangeAsync(entitiesList);

                var res = await DbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new($"Could not create items in database. Error: {e.Message}");
            }

            return entitiesList;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync<TK>(
            Expression<Func<T, bool>> expression,
            Expression<Func<T, TK>> sort
        )
        {
            List<T> items;



            items = await Entity.Where(expression).OrderByDescending(sort).AsNoTracking().ToListAsync();


            return items;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync<TK>(
            Expression<Func<T, bool>> expression,
            int offset,
            int limit,
            Expression<Func<T, TK>> sort
        )
        {
            List<T> items;

            if (expression != null)
            {
                items = await Entity
                    .Where(expression)
                    .OrderBy(sort)
                    .Skip(offset)
                    .Take(limit)
                    .AsNoTracking()
                    .ToListAsync();
            }
            else
            {
                items = await Entity
                    .OrderBy(sort)
                    .Skip(offset)
                    .Take(limit)
                    .AsNoTracking()
                    .ToListAsync();
            }
            if (expression != null)
            {
                items = await Entity
                    .Where(expression)
                    .OrderByDescending(sort)
                    .Skip(offset)
                    .Take(limit)
                    .AsNoTracking()
                    .ToListAsync();
            }
            else
            {
                items = await Entity
                    .OrderByDescending(sort)
                    .Skip(offset)
                    .Take(limit)
                    .AsNoTracking()
                    .ToListAsync();
            }

            return items;
        }

        public async Task<T> UpdateItemAsync(T item, params Expression<Func<T, object>>[] unmodifiedProperties)
        {
            try
            {
                Entity.Update(item);
                foreach (var property in unmodifiedProperties)
                {
                    DbContext.Entry(item).Property(property).IsModified = false;
                }

                await DbContext.SaveChangesAsync();

                DbContext.Entry(item).State = EntityState.Detached;
            }
                catch (Exception e)
            {
                Console.WriteLine(e);
                throw new($"Unable to update item. Error: {e.Message}");
            }

            return item;
        }

        public async Task<List<T>> UpdateItemsAsync(IEnumerable<T> items)
        {
            var entitiesList = items.ToList();

            try
            {
                DbContext.UpdateRange(entitiesList);

                await DbContext.SaveChangesAsync();

                foreach (var entity in entitiesList)
                {
                    DbContext.Entry(entity).State = EntityState.Detached;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new($"Unable to update items. Error: {e.Message}");
            }

            return entitiesList;
        }

        public async Task<T> UpdateItemWithModifiedPropsAsync(T item,
            params Expression<Func<T, object>>[] modifiedProperties)
        {
            try
            {
                Entity.Update(item);
                foreach (var property in modifiedProperties)
                {
                    DbContext.Entry(item).Property(property).IsModified = true;
                }

                await DbContext.SaveChangesAsync();

                DbContext.Entry(item).State = EntityState.Detached;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new($"Unable to update item. Error: {e.Message}");
            }

            return item;
        }


    }

}
