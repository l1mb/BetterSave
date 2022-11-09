using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using AuthServiceApp.DAL.Entities;

namespace AuthServiceApp.DAL.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("UserId");
            builder
                .HasMany(x => x.Spendings)
                .WithOne(e => e.UserId)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            builder.HasIndex(x => x.UserName);
            builder.HasIndex(x => x.Email);
        }
    }
}
