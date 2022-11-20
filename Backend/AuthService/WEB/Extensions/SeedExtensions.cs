using AuthServiceApp.DAL.Entities;
using Microsoft.AspNetCore.Identity;

namespace AuthServiceApp.WEB.Extensions
{
    public static class SeedExtensions
    {
        public static void SeedUsers(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            if (roleManager.FindByNameAsync("Admin").Result == null)
            {
                roleManager.CreateAsync(new ApplicationRole() { Name = "Admin" });
            }
            if (userManager.FindByEmailAsync("admin@zxc.com").Result == null)
            {
                ApplicationUser user = new ApplicationUser
                {
                    UserName = "admin@zxc.com",
                    Email = "admin@zxc.com",
                    EmailConfirmed = true

                };

                IdentityResult result = userManager.CreateAsync(user, "Pa$$w0rd").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }
    }
}
