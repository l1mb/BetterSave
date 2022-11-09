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
            builder
                .HasOne(x => x.SpendingCategory);

            builder.HasIndex(x => x.Name);

        }
    }
}
