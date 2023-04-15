using System.Threading;
using static System.Threading.Tasks.Task;

namespace AuthServiceApp.BL.BackgroundWorkers
{
    public class BackgroundWorkerService: BackgroundService
    {
        private readonly ILogger<BackgroundWorkerService> _logger;

        public BackgroundWorkerService(ILogger<BackgroundWorkerService> logger)
        {
            _logger = logger;
        }

        protected override async  Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                await Delay(1000, stoppingToken);
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Service started");

          
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Service stopped");
            return CompletedTask;
        }
    }
}
