using Microsoft.AspNetCore.Identity;
using System.Reflection;

namespace AuthServiceApp.DAL.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public String? FirstName { get; set; } 
        public String? LastName { get; set; }
        public IList<ApplicationUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }
        public object this[string name]
        {
            get
            {
                var properties = typeof(ApplicationUser)
                        .GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (var property in properties)
                {
                    if (property.Name == name && property.CanRead)
                        return property.GetValue(this, null);
                }

                throw new ArgumentException("Can't find property");

            }
            set
            {
                return;
            }
        }
    }
}
