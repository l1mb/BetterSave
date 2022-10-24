using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.DAL.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public String? FirstName { get; set; } 
        public String? LastName { get; set; }
        public IList<ApplicationUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
