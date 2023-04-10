using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities.Categories
{
    [Table("Category")]
    public class CategoryEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public Guid UserId { get; set; }
        public virtual ICollection<SubCategoryEntity> Subcategories { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
