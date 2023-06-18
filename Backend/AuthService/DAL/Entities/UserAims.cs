using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{
    [Table("UserAims")]
    public class UserAims
    {
        public Guid Id { get; set; }
        public AimEntity Aim { get; set; }
        public ApplicationUser User { get; set; }
        public Guid UserId { get; set; }
        public Guid AimId { get; set; }
    }
}
