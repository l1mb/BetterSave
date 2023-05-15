using AuthServiceApp.BL.Enums;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace AuthServiceApp.WEB.DTOs.Operations
{
    public class OperationModel
    {
        public Guid Id { get; set; }
        public OperationTypes Type { get; set; }
        public float Value { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid SubCategoryId { get; set; }
        public Guid AccountId { get; set; }
    }
}
