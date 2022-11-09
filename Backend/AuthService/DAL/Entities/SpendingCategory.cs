namespace AuthServiceApp.DAL.Entities
{
    public class SpendingCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ShopPosition> ShopPositions { get; set; }
    }
}
