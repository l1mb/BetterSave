using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.DAL.Entities
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public IList<ApplicationUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
