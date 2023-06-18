using AuthServiceApp.DAL.Configuration;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Reflection.Emit;
using AuthServiceApp.WEB.DTOs.Driver;

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
        public DbSet<AimEntity> AimEntities { get; set; }
        public DbSet<AimRecordingEntity> AimRecordings { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<SubCategoryEntity> Subcategories { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.ApplyConfiguration(new OperationConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}