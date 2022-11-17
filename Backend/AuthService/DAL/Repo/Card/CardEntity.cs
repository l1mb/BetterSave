using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.DAL.Repo.Card
{
    public class CardEntity : BaseEntity
    {
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public float Balance { get; set; }
        public string Currency { get; set; }

        public ApplicationUser User { get; set; }
    }
}
