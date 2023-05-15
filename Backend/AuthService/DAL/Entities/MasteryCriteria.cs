using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{

    [Table("AimRecording")]
    public class AimRecordingEntity: BaseEntity
    {
        public DateTime Date { get; set; }
        public Guid AimId { get; set; }
        public virtual AimEntity Aim { get; set; }
    }
}
