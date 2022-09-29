namespace AuthServiceApp.BL.Services.Interfaces
{
    public interface IRoleService
    {
        Task EditAsync(Tuple<string, string> tuple);
    }
}