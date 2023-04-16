using AuthServiceApp.BL.Services.Category;
using AuthServiceApp.WEB.DTOs.Categories;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class CategoryController : GenericController
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] AddCategoryDTO request)
    {
        var result = await _categoryService.CreateCategoryAsync(request);

        return CreatedAtAction(nameof(AddCategory), result);
    }

    [HttpPost]
    public async Task<IActionResult> AddSubCategory([FromBody] AddSubCategoryDTO request)
    {
        var result = await _categoryService.CreateSubCategoryAsync(request);

       return CreatedAtAction(nameof(AddSubCategory), result);
    }

    
    /// <summary>
    /// Get list of categories by user id
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>List</returns>
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetCategories(Guid userId)
    {
        var categories = await _categoryService.GetCategories(userId);

        return Ok(categories);
    }
}