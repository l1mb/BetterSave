using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using System.Runtime.Serialization;

namespace AuthServiceApp.WEB.Extensions
{
    public static class ExceptionHandlerExtension
    {
        public static void RegisterExceptionHandler(this IApplicationBuilder app, Serilog.ILogger Logger)
        {
#if DEBUG
            app.UseDeveloperExceptionPage();
#endif
            app.Use(async (context, next) =>
            {
                try
                {
                    await next();
                }
                catch (ApplicationHelperException ex)
                {

                    context.Response.StatusCode = ex.ErrorStatus switch
                    {
                        ServiceResultType.NotFound => StatusCodes.Status404NotFound,
                        ServiceResultType.InvalidData => StatusCodes.Status400BadRequest,
                        ServiceResultType.NotAuthorized => StatusCodes.Status401Unauthorized,
                        ServiceResultType.Forbidden=> StatusCodes.Status403Forbidden,
                        ServiceResultType.ServerError => StatusCodes.Status500InternalServerError,
                        _ => throw ex
                    };

                    Logger.Information($"Error caught in ApplicationHelperException: {ex.Message}");
                    var result = new { errorMessage = ex.Message };
                    await context.Response.WriteAsJsonAsync(result);
                }
                catch (System.Exception ex)
                {
                    Logger.Information($"{ex.Message}");
//#if DEBUG
                    throw ex;
//#else
                    context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                    var result = new { errorMessage = "Something went wrong..." };
                    await context.Response.WriteAsJsonAsync(result);
//#endif
                }
            });
        }
    }

    
}
