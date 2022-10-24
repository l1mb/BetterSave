using AuthServiceApp.WEB.Settings;

namespace AuthServiceApp.BL
{
    public class TokenGenerator
    {
        private AppSettings appSettnigs;

        public TokenGenerator(AppSettings appSettnigs)
        {
            this.appSettnigs = appSettnigs;
        }

        public string GenerateAccessToken(Guid guid, string username, string role)
        {
            return "mee";
        }
    }
}
