using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using AuthServiceApp.DAL.Entities.Account;

namespace AuthServiceApp.DAL.Entities
{
    public class ApplicationUser : IdentityUser<Guid>, IBaseEntity
    {
        public String? FirstName { get; set; }
        public String? LastName { get; set; }
        public DateTime Birthday { get; set; }
        public IList<ApplicationUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }

        public virtual List<UserAims> Aims { get; set; }

        public virtual ICollection<LoanEntity> Loans { get; set; }
        public virtual ICollection<AccountEntity> UserAccounts { get; set; }
    }
}
