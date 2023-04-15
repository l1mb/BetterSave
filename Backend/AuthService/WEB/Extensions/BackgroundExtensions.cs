using AuthServiceApp.BL.BackgroundWorkers;

namespace AuthServiceApp.WEB.Extensions
{
    public static class BackgroundExtensions
    {
        public static void RegisterBackgroundWorkers(this IServiceCollection services)
        {
            services.AddHostedService<BackgroundWorkerService>();
        }
    }
}
