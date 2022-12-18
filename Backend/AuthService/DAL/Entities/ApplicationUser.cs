using AuthServiceApp.DAL.Repo.Card;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace AuthServiceApp.DAL.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public String? FirstName { get; set; }
        public String? LastName { get; set; }
        public IList<ApplicationUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }
        public List<Spending> Spendings { get; set; }

        public virtual ICollection<CardEntity> Cards { get; set; }
        public virtual AimEntity Aim { get; set; }

        public virtual ICollection<LoanEntity> Loans { get; set; }
    }
}
