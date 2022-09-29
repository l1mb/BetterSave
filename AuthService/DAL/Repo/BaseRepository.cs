using AuthServiceApp.DAL.Interfaces;

namespace AuthServiceApp.DAL.Repo
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public T Create(T entity)
        {
            throw new NotImplementedException();
        }

        public T Delete(int id)
        {
            throw new NotImplementedException();
        }

        public T Get(int id)
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }

        public T Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
