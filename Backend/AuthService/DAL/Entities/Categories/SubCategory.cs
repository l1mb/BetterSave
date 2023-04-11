using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities.Categories
{
    [Table("SubCategory")]
    public class SubCategoryEntity: BaseEntity
    {
        public string Name { get; set; }
        public string Icon { get; set; }        
        public string Color { get; set; }
        public Guid CategoryId{ get; set; }
        public CategoryEntity Category{ get; set; }
    }
}
