using AuthServiceApp.DAL.Entities.Categories;

namespace AuthServiceApp.DAL.Entities
{
    public class ShopPosition
    {
        public Guid? Id { get; set; }
        public bool IsDeleted { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Currency { get; set; }
        public Guid SpendingCategoryId { get; set; }

        public virtual ICollection<Spending> Spendings { get; set; }
        public virtual SpendingCategory SpendingCategory { get; set; }

    }
}
