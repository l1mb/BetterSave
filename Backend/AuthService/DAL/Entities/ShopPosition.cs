namespace AuthServiceApp.DAL.Entities
{
    public class ShopPosition: BaseEntity
    {
        public string Name { get; set; }
        public SpendingCategory SpendingCategory { get; set; }
    }
}
