namespace AuthServiceApp.DAL.Entities
{
    public class SpendingCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Keywords { get; set; }
        public List<ShopPosition> ShopPositions { get; set; }
    }
}
