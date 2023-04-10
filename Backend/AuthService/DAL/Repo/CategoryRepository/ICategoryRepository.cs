using System.Linq.Expressions;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Interfaces;

namespace AuthServiceApp.DAL.Repo.CategoryRepository;

public interface ICategoryRepository: IBaseRepository<CategoryEntity>
{
    Task<List<CategoryEntity>> GetCategories(Expression<Func<CategoryEntity, bool>> expression);
}