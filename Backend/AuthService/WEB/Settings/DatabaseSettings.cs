namespace AuthServiceApp.WEB.Settings
{
    public class DatabaseSettings
    {
        public string Server { get; set; }
        public string Port { get; set; }
        public string Database { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
        public int ConnectTimeout { get; set; }
        public bool Encrypt { get; set; }
        public bool TrustedServerCertificate { get; set; }
        public string ApplicationIntent { get; set; }
        public bool MultiSubnetFailover { get; set; }

        public string ConnectionString =>
            $"Server={Server},{Port};" +
            $"Database={Database};" +
            $"User ID={UserId};" +
            $"Password={Password};" +
            $"Connect Timeout={ConnectTimeout};";
            
    }
}