namespace AuthServiceApp.BL.Services.Category.Models
{
    public class CategoryModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
        public List<SubCategoryModel> Subcategories { get; set; }
    }

    public class SubCategoryModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
    }
}
