namespace AuthServiceApp.DAL.Entities
{
    public class Shop : BaseEntity
    {
        public string ShopName { get; set; }
        public string Address { get; set; }
        public List<Spending> Spendings { get; set; }
    }
}
