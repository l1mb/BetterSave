using AuthServiceApp.DAL.Entities.Operations;
using AuthServiceApp.WEB.DTOs.Operations;

namespace AuthServiceApp.WEB.DTOs.Account
{
    public class AccountModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string IconColor { get; set; }
        public string IconName { get; set; }
        public float Balance { get; set; }
        public  ICollection<OperationModel> Operations { get; set; }
    }
}
