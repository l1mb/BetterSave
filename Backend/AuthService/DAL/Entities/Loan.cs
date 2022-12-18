using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{
    [Table("Loans")]
    public class LoanEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsMine { get; set; }
        public DateTime ReturnDate { get; set; }

        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public float Amount { get; set; }
        public string Currency { get; set; }
    }
}
