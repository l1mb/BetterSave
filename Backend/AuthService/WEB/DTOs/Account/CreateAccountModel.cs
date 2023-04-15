namespace AuthServiceApp.WEB.DTOs.Account
{
    public class CreateAccountModel
    {
        public string Name { get; set; }
        public string IconColor { get; set; }
        public string IconName { get; set; }
        public float Balance { get; set; }
        public Guid UserId { get; set; }
    }
}
