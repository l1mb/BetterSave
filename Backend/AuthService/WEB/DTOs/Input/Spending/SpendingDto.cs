using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.WEB.DTOs.Input.Spending
{
    public class SpendingDto
    {
        public string Name { get; set; }
        public DateTime SpendingDate { get; set; }

        public List<ShopPositionDto> ShopPositions { get; set; }
        public string Shop { get; set; }
    }
}
