using System.Linq.Expressions;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthServiceApp.DAL.Repo.CategoryRepository;

public class CategoryRepository : BaseRepository<CategoryEntity>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext databaseContext) : base(databaseContext)
    {
    }

    public async Task<List<CategoryEntity>> GetCategories(Expression<Func<CategoryEntity, bool>> expression)
    {
        try
        {
            var items = await Entity.Include(x => x.Subcategories).Where(expression).ToListAsync();
            return items;
        }
        catch (Exception e)
        {
            throw new ApplicationHelperException(ServiceResultType.InvalidData, e.Message);
        }
    }
}