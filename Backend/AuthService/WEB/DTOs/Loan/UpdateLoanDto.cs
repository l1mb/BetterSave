namespace AuthServiceApp.WEB.DTOs.Loan
{
    public class UpdateLoanDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Amount { get; set; }
        public string Currency { get; set; }
        public DateTime ReturnDate { get; set; }
        public Guid UserId { get; set; }
    }
}
