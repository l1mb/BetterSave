using Hangfire;

namespace AuthServiceApp.WEB.Extensions
{
    public static class HangfireExtensions
    {
        public static void RegisterHangfire(this IServiceCollection services, string connectionString)
        {
            services.AddHangfire(config => config
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseSqlServerStorage(connectionString)
            );
            services.AddHangfireServer();
        }

        public static void UseHangfire(this WebApplication app)
        {
            app.UseHangfireDashboard();
            app.MapHangfireDashboard();
        }
    }
}
