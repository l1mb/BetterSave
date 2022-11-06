using AuthServiceApp.WEB.Settings;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthServiceApp.BL.Helpers
{
    public static class IdentityExtractor
    {
        public static IEnumerable<Claim> GetValue(this ClaimsPrincipal user)
        {
            var identity = user.Identity as ClaimsIdentity;
            if (identity != null)
            {
                // or
            }
            IEnumerable<Claim> claims = identity.Claims;

            return claims;
        }
    }
}
