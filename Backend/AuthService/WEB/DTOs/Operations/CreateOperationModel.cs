
using AuthServiceApp.BL.Enums;

namespace AuthServiceApp.WEB.DTOs.Operations
{
    public class CreateOperationModel
    {
        public OperationTypes Type { get; set; }
        public float Value { get; set; }
        public string Description { get; set; }
        public Guid SubCategoryId { get; set; }
        public Guid AccountId { get; set; }
    }
}
