using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.DAL.Entities
{
    public interface IBaseEntity
    {
        public Guid Id { get; set; }
        public bool IsDeleted { get; set; }
    }
    public abstract class BaseEntity : IBaseEntity
    {
        public Guid Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
