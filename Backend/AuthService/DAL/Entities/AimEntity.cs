using AuthServiceApp.BL.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{
    [Table("Aim")]
    public class AimEntity : BaseEntity
    {
        public string Name { get; set; }
        public DateTime FinishDate { get; set; }
        public float Amount { get; set; }
        public AimType Type { get; set; }
        public AimDateType DateType { get; set; }
        public bool? IsMastered { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public Guid AimRecordingId { get; set; }
        public virtual List<AimRecordingEntity> AimRecordings { get; set; }
    }
}
