using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthServiceApp.WEB.Settings
{
    public class TokenSettings
    {
        public bool EnableRefreshTokenVerification { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string SigningKey { get; set; }

        public int LifeTime { get; set; }

        public bool ValidateIssuer { get; set; }

        public bool ValidateAudience { get; set; }

        public bool ValidateLifeTime { get; set; }

        public bool ValidateIssuerSigningKey { get; set; }
    }

   
}