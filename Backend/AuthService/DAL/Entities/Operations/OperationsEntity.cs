using System.ComponentModel.DataAnnotations.Schema;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Entities.Categories;

namespace AuthServiceApp.DAL.Entities.Operations
{
    [Table("Operation")]
    public class OperationEntity: BaseEntity
    {
        public OperationEntity()
        {
            CreatedDate = default(DateTime?);
        }
         
        public OperationTypes Type { get; set; }
        public float Value { get; set; }
        public string Description { get; set; }
        public DateTime ? CreatedDate { get; set; }
        public Guid? SubCategoryId { get; set; }
        public Guid AccountId { get; set; }
        public virtual AccountEntity Account { get; set; }
        public virtual SubCategoryEntity SubCategory { get; set; }
    }
}
