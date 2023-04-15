using System.ComponentModel.DataAnnotations.Schema;
using AuthServiceApp.DAL.Entities.Operations;

namespace AuthServiceApp.DAL.Entities.Account
{
    [Table("Account")]
    public class AccountEntity: BaseEntity
    {
        public string Name { get; set; }
        public string IconColor { get; set; }
        public string IconName { get; set; }
        public float Balance { get; set; }

        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public virtual ICollection<OperationEntity> Operations { get; set; }
    }
}
