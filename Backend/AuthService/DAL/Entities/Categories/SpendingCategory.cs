using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities.Categories
{
    public class SpendingCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Keywords { get; set; }
        public virtual ICollection<ShopPosition> ShopPositions { get; set; }
    }
}
