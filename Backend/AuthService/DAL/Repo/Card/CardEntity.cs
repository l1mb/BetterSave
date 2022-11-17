using AuthServiceApp.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Repo.Card
{

    [Table("Cards")]
    public class CardEntity : BaseEntity
    {
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public float Balance { get; set; }
        public string Currency { get; set; }

        public Guid? UserId { get; set; }
        public ApplicationUser User { get; set; }
        public virtual ICollection<Spending> Spendings { get; set; }
    }
}
