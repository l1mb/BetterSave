using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo.Card;

namespace AuthServiceApp.DAL.Repo
{
    public interface ICardRepository : IBaseRepository<CardEntity>
    {
    }
}