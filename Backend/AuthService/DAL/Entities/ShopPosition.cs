namespace AuthServiceApp.DAL.Entities
{
    public class ShopPosition: BaseEntity
    {
        public string Name { get; set; }


        public List<SpendingShopPositions> Spendings { get; set; } 

        public SpendingCategory SpendingCategory { get; set; }
        public int SpendingCategoryId { get; set; }

    }
}
