using AuthServiceApp.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using AuthServiceApp.DAL.Repo.Card;

namespace AuthServiceApp.DAL.Configuration
{
    public class CardConfiguration : IEntityTypeConfiguration<CardEntity>
    {
        public void Configure(EntityTypeBuilder<CardEntity> builder)
        {
            builder.HasKey(key => key.Id);
            builder.Property(prop => prop.Id).IsRequired();

            builder.HasMany(key => key.Spendings).WithOne(one => one.Card).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(key => key.User).WithMany(one => one.Cards).OnDelete(DeleteBehavior.NoAction);
        }
    }

}
