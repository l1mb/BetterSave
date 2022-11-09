using AuthServiceApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthServiceApp.DAL.Configuration
{
    public class ShopPositionConfiguration : IEntityTypeConfiguration<ShopPosition>
    {
        public void Configure(EntityTypeBuilder<ShopPosition> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(prop => prop.Id).IsRequired();
            builder
                .HasOne(x => x.SpendingCategory)
                .WithMany(many => many.ShopPositions)
                .HasForeignKey(key => key.SpendingCategoryId)
                .HasPrincipalKey(key => key.Id)
                .IsRequired();

            builder.HasIndex(x => x.Name);

        }
    }
}
