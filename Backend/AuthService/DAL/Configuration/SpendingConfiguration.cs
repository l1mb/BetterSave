using AuthServiceApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthServiceApp.DAL.Configuration
{
    public class SpendingConfiguration : IEntityTypeConfiguration<Spending>
    {
        public void Configure(EntityTypeBuilder<Spending> builder)
        {
            builder.HasKey(key => key.Id);
            builder.Property(prop => prop.Id).IsRequired();

            builder
                .HasOne(one => one.Shop)
                .WithMany(many => many.Spendings)
                .HasPrincipalKey(key => key.Id)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(one => one.User)
                .WithMany(many => many.Spendings)
                .HasPrincipalKey(key => key.Id)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(one => one.Card)
                .WithMany(one => one.Spendings)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
