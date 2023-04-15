namespace AuthServiceApp.WEB.DTOs.Account
{
    public class CreateAccountModel
    {
        /// <example>Prior</example>
        public string Name { get; set; }
        /// <example>cyan</example>
        public string IconColor { get; set; }
        /// <example>attach_money</example>
        public string IconName { get; set; }
        /// <example>0</example>
        public float Balance { get; set; }
        /// <summary>
        /// User id
        /// </summary>
        public Guid UserId { get; set; }
    }
}
