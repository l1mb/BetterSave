using System.Text;
using AuthServiceApp.WEB.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AuthServiceApp.WEB.Extensions
{
    public static class AuthenticationExtensions
    {
        public static void RegisterAuthSettings(this IServiceCollection services, AppSettings appSettings)
        {
            var tokenSettings = appSettings.Token;
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = tokenSettings.ValidateIssuer,
                    ValidIssuer = tokenSettings.Issuer,

                    ValidateAudience = tokenSettings.ValidateAudience,
                    ValidAudience = tokenSettings.Audience,

                    ValidateLifetime = tokenSettings.ValidateLifeTime,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSettings.SigningKey)),
                    ValidateIssuerSigningKey = tokenSettings.ValidateIssuerSigningKey
                };
            });
            

        }
    }
}
