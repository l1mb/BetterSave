namespace AuthServiceApp.WEB.Settings
{
    public class AppSettings
    {
        public DatabaseSettings Database { get; set; }
        public TokenSettings Token { get; set; }
        public GoogleAuthSettings GoogleAuthSettings{ get; set; }

        public SmtpClientSettings SmtpClientSettings { get; set; }
       
    }

}
