using System.ComponentModel.DataAnnotations.Schema;
using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Entities.Operations;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace AuthServiceApp.DAL.Entities.Categories
{
    [Table("SubCategory")]
    public class SubCategoryEntity: BaseEntity
    {
        public string Name { get; set; }
        public string Icon { get; set; }        
        public string Color { get; set; }
        public Guid CategoryId{ get; set; }
        public CategoryEntity Category{ get; set; }
        public  virtual ICollection<OperationEntity> Operations { get; set; }
    }
}
