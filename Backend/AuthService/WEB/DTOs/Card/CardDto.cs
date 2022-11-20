namespace AuthServiceApp.WEB.DTOs.Card
{
    public class CardDto
    {
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public float Balance { get; set; }
        public string Currency { get; set; }
        public Guid UserId { get; set; }
        public Guid Id { get; set; }
    }
}
