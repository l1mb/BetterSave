using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AuthServiceApp.Settings.Extensions
{
    public static class IdentityExtensions
    {
        public static void RegisterIdentity(this IServiceCollection services)
        {
            services
                .AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.Configure<IdentityOptions>(options => { options.User.RequireUniqueEmail = true; });
        }
    }
}
