namespace AuthServiceApp.WEB.DTOs.Input.Shop
{
    public class ShopDto
    {
        public ShopDto(string shopName)
        {
            ShopName = shopName;
        }

        public string ShopName { get; set; }
        public string? Adress { get; set; }
    }
}
