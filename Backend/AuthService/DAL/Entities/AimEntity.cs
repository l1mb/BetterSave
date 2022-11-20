using AuthServiceApp.BL.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{
    [Table("Aim")]
    public class AimEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        [ForeignKey("AimTypeId")]
        public Guid AimTypeId { get; set; }
        public virtual AimTypeEntity AimType { get; set; }

        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
