using AuthServiceApp.WEB.DTOs.Input.Shop;

namespace AuthServiceApp.WEB.DTOs.Spending
{
    public class SpendingReportDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float Coast { get; set; }
        public DateTime Date { get; set; }

        public List<SpendingShopItemCategory> ShopItems { get; set; }
        public ShopDto Shop { get; set; }


    }
}
