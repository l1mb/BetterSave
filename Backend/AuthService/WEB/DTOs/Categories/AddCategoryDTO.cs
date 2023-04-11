namespace AuthServiceApp.WEB.DTOs.Categories
{
    public class AddCategoryDTO
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
        public Guid UserId {get; set; }
    }
}
