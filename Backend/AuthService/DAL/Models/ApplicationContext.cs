using AuthServiceApp.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace AuthServiceApp.DAL.Models
{
    public class ApplicationDbContext : IdentityDbContext<
            ApplicationUser,
            ApplicationRole,
            Guid,
            IdentityUserClaim<Guid>,
            ApplicationUserRole,
            IdentityUserLogin<Guid>,
            IdentityRoleClaim<Guid>,
            IdentityUserToken<Guid>
        >
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}