namespace AuthServiceApp.DAL.Entities
{
    public class SpendingShopPositions
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public Spending Spending { get; set; }
        public ShopPosition ShopPosition { get; set; }
    }
}
