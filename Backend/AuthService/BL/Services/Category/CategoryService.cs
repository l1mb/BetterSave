using AuthServiceApp.BL.Services.Category.Models;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Interfaces;
using System.Runtime.InteropServices;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.DAL.Repo.CategoryRepository;
using AuthServiceApp.WEB.DTOs.Categories;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Category
{
    public class CategoryService : GenericService<CategoryEntity>, ICategoryService
    {
        private IBaseRepository<SubCategoryEntity> _subCategoryRepository;
        private ICategoryRepository _categoryRepository; 
        private IMapper _mapper;
        

        public CategoryService(IBaseRepository<CategoryEntity?> repository, IMapper mapper, IBaseRepository<SubCategoryEntity> subCategoryRepository, ICategoryRepository categoryRepository) : base(repository)
        {
            _mapper = mapper;
            _subCategoryRepository = subCategoryRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryModel>> GetCategories(Guid userId)
        {
            
            var items = await _categoryRepository.GetCategories(x => x.UserId == userId && x.IsDeleted == false);
            
            return _mapper.Map<List<CategoryModel>>(items);
        }

        public async Task<CategoryModel> CreateCategoryAsync(AddCategoryDTO dto)
        {
            var entity = _mapper.Map<CategoryEntity>(dto);
            var result = await _categoryRepository.CreateItemAsync(entity);

            return _mapper.Map<CategoryModel>(result);
        }

        public async Task<AddSubCategoryDTO> CreateSubCategoryAsync(AddSubCategoryDTO dto)
        {
            var entity = _mapper.Map<SubCategoryEntity>(dto);
            var category = await _categoryRepository.SearchForSingleItemAsync(x => x.Id == entity.CategoryId && x.IsDeleted == false, x => x.Subcategories);
            if (category is null)
            {
                throw new ApplicationHelperException("Such category doesn't exist");
            }

            var result = await _subCategoryRepository.CreateItemAsync(entity);

            return _mapper.Map<AddSubCategoryDTO>(result);
        }
    }
}
