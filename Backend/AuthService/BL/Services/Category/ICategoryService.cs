using AuthServiceApp.BL.Services.Category.Models;
using AuthServiceApp.WEB.DTOs.Categories;

namespace AuthServiceApp.BL.Services.Category
{
    public interface ICategoryService
    {
        public Task<List<CategoryModel>> GetCategories(Guid userId);
        public Task<CategoryModel> CreateCategoryAsync(AddCategoryDTO dto);
        public Task<AddSubCategoryDTO> CreateSubCategoryAsync(AddSubCategoryDTO dto);
    }
}
