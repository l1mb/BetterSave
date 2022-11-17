using AuthServiceApp.BL.Services.Card;
using AuthServiceApp.BL.Services.Classes;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.BL.Services.Interfaces;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.Services.Classes;
using AuthServiceApp.Services.Interfaces;
using AuthServiceApp.WEB.Settings;
using AuthServiceApp.WEB.Utilities;

namespace AuthServiceApp.WEB.Extensions
{
    public static class InjectExtensions
    {
        public static void RegisterServices(this IServiceCollection services, AppSettings appSettings)
        {
            //settings
            services.AddSingleton(appSettings);

            //Services
            services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddTransient<ICardService, CardService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ISpendingService, SpendingService>();
            services.AddTransient<IShopService, ShopService>();

            //Repositories
            services.AddTransient<ICardRepository, CardRepository>();
            services.AddTransient<ISpendingRepository, SpendingRepository>();
            services.AddTransient<IShopRepository, ShopRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IEmailSender, EmailSender>();


        }
    }
}
