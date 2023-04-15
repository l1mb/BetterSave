namespace AuthServiceApp.BL.Services.ServiceManagement
{
    public interface IServiceManagement
    {
        void SendEmail();
        void UpdateDatabase();
        void SyncData();
        Task CheckUserLoans();
    }
}
