namespace AuthServiceApp.BL.Services.Category.Models
{
    public class CategoryModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public List<SubCategoryModel> SubCategories { get; set; }
    }

    public class SubCategoryModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
    }
}
