using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.DAL.Entities
{
    public class ApplicationUserRole : IdentityUserRole<Guid>
    {
        public IList<ApplicationUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
