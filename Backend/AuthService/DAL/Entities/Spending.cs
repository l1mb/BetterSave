namespace AuthServiceApp.DAL.Entities
{
    public class Spending: BaseEntity
    {
        public string Name { get; set; }
        public string Cost { get; set; }
        public DateTime SpendingDate { get; set; }
        public Shop Shop { get; set; }
    }
}
