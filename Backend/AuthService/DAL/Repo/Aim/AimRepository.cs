using System.IO.Enumeration;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Models;
using AuthServiceApp.WEB.DTOs.Aim;
using Microsoft.EntityFrameworkCore;

namespace AuthServiceApp.DAL.Repo.Aim
{
    public class AimRepository: BaseRepository<AimEntity>, IAimRepository
    {
        
        public AimRepository(ApplicationDbContext databaseContext) : base(databaseContext)
        {
        }

        public async Task<AimEntity?> FindOneById(Guid id)
        {
            var singleOrDefault = await Entity.SingleOrDefaultAsync(x => x.Id == id);

            return singleOrDefault;
        }

        
    }

    public interface IAimRepository: IBaseRepository<AimEntity>
    {
        Task<AimEntity?> FindOneById(Guid id);
    }
}
