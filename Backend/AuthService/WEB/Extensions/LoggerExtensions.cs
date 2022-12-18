using Serilog;
using Serilog.Events;
using Serilog.Sinks.RollingFileAlternative;

namespace AuthServiceApp.WEB.Extensions
{
    public static class LoggerExtensions
    {
        public static Serilog.Core.Logger RegisterLogger()
        {
            return new LoggerConfiguration()
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
        }
    }
}
