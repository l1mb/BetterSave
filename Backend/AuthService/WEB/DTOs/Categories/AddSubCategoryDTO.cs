namespace AuthServiceApp.WEB.DTOs.Categories
{
    public class AddSubCategoryDTO
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
    }
}
