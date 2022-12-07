using WebApp.Models;

namespace WebApp.Data {
    interface IRepository<T> : IDisposable
            where T : class {
        IEnumerable<T> GetList(); // получение всех объектов
        T GetElement(string id); // получение одного объекта по id
        void Create(T item); // создание объекта
        void Update(T item); // обновление объекта
        void Delete(string id); // удаление объекта по id
        void Save();  // сохранение изменений
    }
}
