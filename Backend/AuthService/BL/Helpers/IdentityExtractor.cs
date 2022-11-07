using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.WEB.Settings;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthServiceApp.BL.Helpers
{
    public static class ClaimHelper
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

        public static string GetUserId(ClaimsPrincipal user)
        {
            var UserIdClaim = GetValue(user).Where(claim => (string)claim.Type == "UserId").SingleOrDefault();

            if (UserIdClaim is null)
            {
                throw new ApplicationHelperException(ServiceResultType.InvalidData, ExceptionMessageConstants.TokenIsBroken);
            }
            return UserIdClaim.Value;
        }
    }
}
