using AuthServiceApp.BL.Enums;
using AuthServiceApp.WEB.DTOs.Aim;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{
    [Table("Aim")]
    public class AimEntity : BaseEntity
    {
        public string Name { get; set; }
        public DateTime FinishDate { get; set; }
        public float Amount { get; set; }
        public AimType AimType { get; set; }

        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
