using AuthServiceApp.DAL.Models;
using AuthServiceApp.Settings.Extensions;
using AuthServiceApp.WEB.Settings;
using GameStore.WEB.StartUp.Configuration;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var appSettings = RegisterSettings(builder.Configuration);
builder.Services.RegisterServices(appSettings);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.RegistryDatabase(appSettings);
builder.Services.RegisterHttpContextExtensions();
builder.Services.RegisterIdentity();
builder.Services.RegisterAutoMapper();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.MapControllers();
app.UseHttpsRedirection();
app.UseRouting();
app.Run();

static AppSettings RegisterSettings(IConfiguration configuration) =>
           new()
           {
               Database = configuration.GetSection(nameof(AppSettings.Database)).Get<DatabaseSettings>(),
               Token = configuration.GetSection(nameof(AppSettings.Token)).Get<TokenSettings>(),
               SmtpClientSettings = configuration.GetSection(nameof(AppSettings.SmtpClientSettings))
                   .Get<SmtpClientSettings>()
           };