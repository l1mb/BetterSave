namespace AuthServiceApp.DAL.Entities
{
    public class Spending: BaseEntity
    {
        public string Name { get; set; }
        public string Cost { get; set; }
        public DateTime SpendingDate { get; set; }

        public List<SpendingShopPositions> ShopPositions { get; set; }
        public Shop Shop { get; set; }
        public int ShopId { get; set; }
        
        public ApplicationUser User { get; set; }
        public Guid UserId { get; set; }
    }
}
