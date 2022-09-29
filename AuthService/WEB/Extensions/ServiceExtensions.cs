using AuthServiceApp.Services.Interfaces;
using AuthServiceApp.WEB.Settings;
using AuthServiceApp.Services.Classes;
using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Interfaces;

namespace AuthServiceApp.Settings.Extensions
{
    public static class ServiceExtensions
    {
        public static void RegisterServices(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddSingleton(appSettings);

            services.AddTransient<IRoleService, RoleService>();


            services.AddTransient<IUserRepository, UserRepository>();

            services.AddTransient<IAuthService, AuthService>();
        }
    }
}
