using AuthServiceApp.WEB.Settings;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthServiceApp.WEB.Utilities
{
    public class TokenGenerator
    {
        private readonly AppSettings _appSettings;

        public TokenGenerator(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        public string GenerateAccessToken(int userId, string userName, string userRole)
        {
            var claim = GetClaims(userId, userName, userRole);

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Token.SigningKey));
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                _appSettings.Token.Issuer,
                _appSettings.Token.Audience,
                notBefore: now,
                claims: claim.Claims,
                expires: now.Add(TimeSpan.FromMinutes(_appSettings.Token.LifeTime)),
                signingCredentials: new(key, SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        private static ClaimsIdentity GetClaims(int userId, string userName, string userRole)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, userId.ToString()),
                new(ClaimTypes.Role, userRole),
                new(ClaimTypes.Name, userName)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims,
                "Token"
            );

            return claimsIdentity;
        }
    }
}