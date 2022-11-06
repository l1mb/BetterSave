using AuthServiceApp.DAL.Models;
using AuthServiceApp.Settings.Extensions;
using AuthServiceApp.WEB.Extensions;
using AuthServiceApp.WEB.Settings;
using GameStore.WEB.StartUp.Configuration;
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

var builder = WebApplication.CreateBuilder(args);

var appSettings = RegisterSettings(builder.Configuration);
builder.Services.RegisterServices(appSettings);
Log.Logger = new LoggerConfiguration()
                       .MinimumLevel.Debug()
                       .WriteTo.Logger(l =>
                           l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Information).WriteTo
                               .RollingFile(@"Logs\Info-{Date}.log"))
                       .WriteTo.Logger(l =>
                           l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Debug).WriteTo
                               .RollingFile(@"Logs\Debug-{Date}.log"))
                       .WriteTo.Logger(l =>
                           l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Warning).WriteTo
                               .RollingFile(@"Logs\Warning-{Date}.log"))
                       .WriteTo.Logger(l =>
                           l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Error).WriteTo
                               .RollingFile(@"Logs\Error-{Date}.log"))
                       .WriteTo.Logger(l =>
                           l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Fatal).WriteTo
                               .RollingFile(@"Logs\Fatal-{Date}.log"))
                       .WriteTo.RollingFile(@"Logs\Verbose-{Date}.log")
                       .CreateLogger();

builder.Services.AddSwaggerGen();

builder.Services.RegistryDatabase(appSettings);
builder.Services.RegisterIdentity();
builder.Services.RegisterAutoMapper();

builder.Services.RegisterAuthSettings(appSettings);
builder.Services.RegisterHttpContextExtensions();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
    options.SerializerSettings.Converters.Add(new StringEnumConverter());
});

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        //.AllowCredentials();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.UseHttpsRedirection();
app.Run();

static AppSettings RegisterSettings(IConfiguration configuration) =>
    new(){
        Database = configuration.GetSection(nameof(AppSettings.Database)).Get<DatabaseSettings>(),
        Token = configuration.GetSection(nameof(AppSettings.Token)).Get<TokenSettings>(),
        SmtpClientSettings = configuration.GetSection(nameof(AppSettings.SmtpClientSettings))
            .Get<SmtpClientSettings>(),
        GoogleAuthSettings = configuration.GetSection(nameof(AppSettings.GoogleAuthSettings))
            .Get<GoogleAuthSettings>()
    };