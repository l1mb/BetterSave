namespace AuthServiceApp.WEB.StartUp.Configuration
{
    public static class AutoMapperExtensions
    {
        public static void RegisterAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Program));
        }
    }
}