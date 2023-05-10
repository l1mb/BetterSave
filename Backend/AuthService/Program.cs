using AuthServiceApp.BL.Services.ServiceManagement;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.Settings.Extensions;
using AuthServiceApp.WEB.Extensions;
using AuthServiceApp.WEB.Settings;
using AuthServiceApp.WEB.StartUp.Configuration;
using Hangfire;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Serilog;
using LoggerExtensions = AuthServiceApp.WEB.Extensions.LoggerExtensions;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

var appSettings = RegisterSettings(builder.Configuration);
Log.Logger = LoggerExtensions.RegisterLogger();


builder.Services.RegisterHangfire(appSettings.Database.ConnectionString);
builder.Services.RegisterServices(appSettings);

builder.Services.RegisterSwagger(appSettings.SwaggerSettings);

builder.Services.RegistryDatabase(appSettings);
builder.Services.RegisterIdentity();
builder.Services.RegisterAutoMapper();

//builder.Services.RegisterBackgroundWorkers();

builder.Services.RegisterAuthSettings(appSettings);
builder.Services.RegisterHttpContextExtensions();
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            //.AllowCredentials();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.

app.RegisterSwaggerUi();
app.UseHangfire();

var scopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
using (var scope = scopeFactory.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    SeedExtensions.SeedUsers(userManager,
        roleManager);
}

app.UseRouting();
app.RegisterExceptionHandler(Log.Logger);
app.UseSerilogRequestLogging();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/",
        async context => await context.Response.WriteAsync("healthy"));
});
app.UseStaticFiles();
app.MapControllers();


if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Development")
    RecurringJob.AddOrUpdate<IServiceManagement>(x => x.CheckUserLoans(),
        Cron.Minutely);

RecurringJob.AddOrUpdate<IServiceManagement>(x => x.CheckUsersAims(),
    Cron.Monthly);


app.Run();

static AppSettings RegisterSettings(IConfiguration configuration)
{
    Console.WriteLine(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
    var conf = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json",
            false,
            true)
        .AddJsonFile(
            $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json",
            true,
            true)
        .AddEnvironmentVariables()
        .Build();

    return new()
    {
        Database = conf
            .GetSection(nameof(AppSettings.Database))
            .Get<DatabaseSettings>(),
        Token = conf
            .GetSection(nameof(AppSettings.Token))
            .Get<TokenSettings>(),
        SmtpClientSettings = conf
            .GetSection(nameof(AppSettings.SmtpClientSettings))
            .Get<SmtpClientSettings>(),
        GoogleAuthSettings = conf
            .GetSection(nameof(AppSettings.GoogleAuthSettings))
            .Get<GoogleAuthSettings>(),
        SwaggerSettings = conf
            .GetSection(nameof(AppSettings.SwaggerSettings))
            .Get<SwaggerSettings>()
    };
}