namespace AuthServiceApp.DAL.Entities
{
    public class SpendingShopPositions : BaseEntity
    {
        public Guid SpendingId { get; set; }
        public Spending Spending { get; set; }
        public Guid ShopPositionId { get; set; }
        public ShopPosition ShopPosition { get; set; }
    }
}
