using AuthServiceApp.DAL.Models;
using AuthServiceApp.WEB.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AuthServiceApp.Settings.Extensions
{
    public static class DatabaseExtensions
    {
        public static void RegistryDatabase(this IServiceCollection services, AppSettings settings)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseSqlServer(settings.Database.ConnectionString);
            }, ServiceLifetime.Transient
          );
        }
    }
}
