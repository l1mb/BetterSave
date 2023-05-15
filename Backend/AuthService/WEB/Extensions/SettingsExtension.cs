using AuthServiceApp.WEB.Settings;

namespace AuthServiceApp.WEB.Extensions;

public static class SettingsExtension
{
    public static AppSettings RegisterSettings(this IConfiguration configuration)
    {
        Console.WriteLine(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
        var conf = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddJsonFile(
                $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json",
                true)
            .AddEnvironmentVariables()
            .Build();

        return new()
        {
            Database = conf.GetSection(nameof(AppSettings.Database))
                .Get<DatabaseSettings>(),
            Token = conf.GetSection(nameof(AppSettings.Token))
                .Get<TokenSettings>(),
            SmtpClientSettings = conf.GetSection(nameof(AppSettings.SmtpClientSettings))
                .Get<SmtpClientSettings>(),
            GoogleAuthSettings = conf.GetSection(nameof(AppSettings.GoogleAuthSettings))
                .Get<GoogleAuthSettings>()
        };
    }
}