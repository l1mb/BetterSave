using AuthServiceApp.DAL.Configuration;
using AuthServiceApp.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Reflection.Emit;

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

        public DbSet<Shop> Shops { get; set; }
        public DbSet<Spending> Spendings { get; set; }
        public DbSet<ShopPosition> ShopPositions { get; set; }
        public DbSet<SpendingCategory> SpendingCategories { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserConfiguration()); 
            builder.ApplyConfiguration(new ShopPositionConfiguration());
            builder.ApplyConfiguration(new SpendingConfiguration());
            builder.ApplyConfiguration(new SpendingShopPositionConfiguration());
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}