using AuthServiceApp.Services.Interfaces;
using AuthServiceApp.WEB.Settings;
using AuthServiceApp.Services.Classes;
using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo;
using AuthServiceApp.WEB.Utilities;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.Settings.Extensions
{
    public static class ServiceExtensions
    {
        public static void RegisterServices(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddSingleton(appSettings);
            services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ISpendingService, SpendingService>();
            services.AddTransient<IShopService, ShopService>();

            services.AddTransient<ISpendingRepository, SpendingRepository>();
            services.AddTransient<IShopRepository, ShopRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddTransient<IAuthService, AuthService>();

        }
    }
}
