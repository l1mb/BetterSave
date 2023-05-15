using AuthServiceApp.BL.Services.ServiceManagement;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.Settings.Extensions;
using AuthServiceApp.WEB.Extensions;
using AuthServiceApp.WEB.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.RollingFileAlternative;
using LoggerExtensions = AuthServiceApp.WEB.Extensions.LoggerExtensions;
using AuthServiceApp.WEB.StartUp.Configuration;
using Microsoft.AspNetCore.Identity;
using AuthServiceApp.DAL.Entities;
using Hangfire;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = LoggerExtensions.RegisterLogger();
builder.Host.UseSerilog();

var appSettings = builder.Configuration.RegisterSettings(); // inject settings from appsettings.json

builder.Services.RegisterServices(appSettings);
builder.Services.RegisterHangfire(appSettings.Database.ConnectionString);

builder.Services.RegisterSwagger();

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
    SeedExtensions.SeedUsers(userManager,
        roleManager);
}

app.UseRouting();
app.RegisterExceptionHandler(Log.Logger);
app.UseSerilogRequestLogging();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints((endpoints) =>
{
    endpoints.MapGet("/",
        async context => await context.Response.WriteAsync("healthy"));
});
app.UseStaticFiles();
app.MapControllers();

app.UseHttpsRedirection();

if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Development")
{
    RecurringJob.AddOrUpdate<IServiceManagement>(x => x.CheckUserLoans(),
        Cron.Daily);
}

app.Run();

