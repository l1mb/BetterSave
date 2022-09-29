namespace AuthServiceApp.DAL.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        T Get(int id);
        T Update(T entity);
        T Delete(int id);
        T GetById(int id);
        T Create(T entity);
    }
}