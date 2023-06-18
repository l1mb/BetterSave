using AuthServiceApp.BL.Services.ServiceManagement;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
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

Log.Logger = LoggerExtensions.RegisterLogger();
builder.Host.UseSerilog();

var appSettings = builder.Configuration.RegisterSettings(); // inject settings from appsettings.json
builder.Services.RegisterServices(appSettings);
builder.Services.RegisterHangfire(appSettings.Database.ConnectionString);

builder.Services.RegisterSwagger(appSettings.SwaggerSettings);

builder.Services.RegistryDatabase(appSettings);
builder.Services.RegisterIdentity();
builder.Services.RegisterAutoMapper();

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

app.RegisterSwaggerUi();
app.UseHangfire();

var scopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();

using (var scope = scopeFactory.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    SeedExtensions.SeedUsers(userManager, roleManager);
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


RecurringJob.AddOrUpdate<IServiceManagement>(x => x.CheckUserLoans(),
    Cron.Daily);

RecurringJob.AddOrUpdate<IServiceManagement>(x => x.CheckUsersAims(),
    Cron.Daily);

app.Run();

