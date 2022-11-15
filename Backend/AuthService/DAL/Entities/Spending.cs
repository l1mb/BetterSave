namespace AuthServiceApp.DAL.Entities
{
    public class Spending : BaseEntity
    {
        public string Name { get; set; }
        public string Cost { get; set; }
        public DateTime SpendingDate { get; set; }

        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }

        public virtual ICollection<ShopPosition> ShopPositions { get; set; }

        public Guid ShopId { get; set; }
        public Shop Shop { get; set; }


    }
}
