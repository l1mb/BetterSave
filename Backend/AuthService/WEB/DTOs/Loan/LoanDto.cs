using Org.BouncyCastle.Bcpg;

namespace AuthServiceApp.WEB.DTOs.Loan
{
    public class LoanDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsMine { get; set; }
        public DateTime ReturnDate { get; set; }
        public float Amount { get; set; }
        public string Currency { get; set; }
        public Guid UserId { get; set; }
    }
}
