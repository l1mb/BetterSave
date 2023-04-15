using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Entities.Operations;
using AuthServiceApp.DAL.Repo.Card;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthServiceApp.DAL.Configuration
{
    public class OperationConfiguration: IEntityTypeConfiguration<OperationEntity>
    {
        public void Configure(EntityTypeBuilder<OperationEntity> builder)
        {
            //builder.HasKey(x => x.Id);
            //builder.HasOne(operation => operation.SubCategory).WithMany(subCategory => subCategory.Operations).
        }
    }
}
