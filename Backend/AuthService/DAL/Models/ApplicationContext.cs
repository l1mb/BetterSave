using AuthServiceApp.DAL.Configuration;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo.Card;
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

        public DbSet<Shop> Shops { get; set; }
        public DbSet<Spending> Spendings { get; set; }
        public DbSet<ShopPosition> ShopPositions { get; set; }
        public DbSet<SpendingCategory> SpendingCategories { get; set; }
        public DbSet<AimEntity> AimEntities { get; set; }
        public DbSet<AimTypeEntity> AimTypeEntities { get; set; }
        public DbSet<res> CategoryInfo { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<SubCategoryEntity> Subcategories { get; set; }
        public DbSet<Driver> Drivers { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<res>().HasNoKey().ToView(null); ;
            builder.Entity<CardEntity>().HasQueryFilter(p => !p.IsDeleted);

            builder.ApplyConfiguration(new OperationConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new ShopPositionConfiguration());
            builder.ApplyConfiguration(new SpendingConfiguration());
            builder.ApplyConfiguration(new CardConfiguration());
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}