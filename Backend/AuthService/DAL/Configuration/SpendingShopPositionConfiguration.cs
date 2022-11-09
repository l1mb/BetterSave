using AuthServiceApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthServiceApp.DAL.Configuration
{
    public class SpendingShopPositionConfiguration : IEntityTypeConfiguration<SpendingShopPositions>
    {
        public void Configure(EntityTypeBuilder<SpendingShopPositions> builder)
        {
            builder
                .HasOne(x => x.ShopPosition)
                .WithMany(x => x.Spendings)
                .HasPrincipalKey(pk => pk.Id);
            builder
                .HasOne(x => x.Spending)
                .WithMany(x => x.ShopPositions)
                .HasPrincipalKey(pk => pk.Id);

        }
    }
}
