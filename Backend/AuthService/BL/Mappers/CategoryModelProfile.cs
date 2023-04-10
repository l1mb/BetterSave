using AuthServiceApp.BL.Services.Category.Models;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.WEB.DTOs.Categories;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers;

public class CategoryModelProfile : Profile
{
    public CategoryModelProfile()
    {
        CreateMap<CategoryModel, CategoryEntity>().ReverseMap();
        CreateMap<SubCategoryModel, SubCategoryEntity>().ReverseMap();

        CreateMap<AddCategoryDTO, CategoryEntity>().ReverseMap();
        CreateMap<AddSubCategoryDTO, SubCategoryEntity>().ReverseMap();
    }
}