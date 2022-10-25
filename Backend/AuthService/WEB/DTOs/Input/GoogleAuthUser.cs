namespace AuthServiceApp.WEB.DTOs.Input
{
    public class GoogleAuthUser
    {
        public Guid id { get; set; }
        public String name { get; set; }
        public String email { get; set; }
        public string oauthSubject { get; set; }
        public string oauthIssuer { get; set; }
        public string tokenId { get; set; }
    };

}
