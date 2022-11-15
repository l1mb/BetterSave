namespace AuthServiceApp.WEB.DTOs.Input.Spending
{
    public class GetSpendingsDto
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
    }
}
