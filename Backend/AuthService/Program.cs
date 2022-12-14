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

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

var appSettings = RegisterSettings(builder.Configuration);
Log.Logger = LoggerExtensions.RegisterLogger();

builder.Services.RegisterServices(appSettings);

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
app.RegisterExceptionHandler(Log.Logger);
app.UseSerilogRequestLogging();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints((endpoints) =>
{
    endpoints.MapGet("/", async context => await context.Response.WriteAsync("healthy"));
});
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