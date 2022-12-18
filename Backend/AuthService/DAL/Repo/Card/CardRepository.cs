using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;

namespace AuthServiceApp.DAL.Repo.Card
{
    public class CardRepository : BaseRepository<CardEntity>, ICardRepository
    {
        public CardRepository(ApplicationDbContext databaseContext) : base(databaseContext)
        {
        }
    }
}
