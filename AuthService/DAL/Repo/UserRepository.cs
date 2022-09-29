using AuthServiceApp.DAL.Interfaces;

namespace AuthServiceApp.DAL.Repo
{
    public class UserRepository: BaseRepository<ApplicationUser>, IUserRepository
    {
    }
}
