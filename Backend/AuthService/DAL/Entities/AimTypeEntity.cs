using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServiceApp.DAL.Entities
{
    [Table("AimType")]
    public class AimTypeEntity : BaseEntity
    {
        public string Name { get; set; }
        public virtual ICollection<AimEntity> AimEntities { get; set; }
    }
}
