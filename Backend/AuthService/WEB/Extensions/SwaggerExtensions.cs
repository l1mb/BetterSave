using Microsoft.OpenApi.Models;
using System.Reflection;

namespace AuthServiceApp.WEB.Extensions
{
    public static class SwaggerExtensions
    {
        public static void RegisterSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(
                c =>
                {
                    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                    c.IncludeXmlComments(xmlPath);

                    c.SwaggerDoc("v1",  new()
                    {
                        Version = "v1",
                        Title = "Click on 'TermsOfService' API",
                        Description = "Better Save WEB API",
                        TermsOfService = new("../Home/GetInfo", UriKind.Relative)
                    });

                    c.CustomSchemaIds(x => x.FullName);
                    c.AddSecurityDefinition("Bearer", new()
                    {
                        Description = "JWT Authorization via Bearer scheme: Bearer {token}",
                        Scheme = "JWT",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey
                    });
                    c.AddSecurityRequirement(new()
                    {
                        {
                            new()
                            {
                                Reference = new()
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            Array.Empty<string>()
                        }
                    });
                });
        }

        public static void RegisterSwaggerUi(this IApplicationBuilder app)
        {
            app.UseSwagger(x => { x.RouteTemplate = "swagger/{documentName}/swagger.json"; });

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Better Save API V1");
                options.InjectStylesheet("/assets/css/swagger-theme.css");
            });
        }
    }
}
