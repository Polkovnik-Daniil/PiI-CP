using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data {
    public class MansRepository : IRepository<Mans> {
        private ApplicationDbContext db;

        public MansRepository() {
            this.db = new ApplicationDbContext(ApplicationDbContext._options, ApplicationDbContext._operationalStoreOptions);
        }

        public IEnumerable<Mans> GetList() {
            return db._mans;
        }

        public Mans GetElement(int id) {
            return db._mans.Find(id);
        }

        public void Create(Mans man) {
            db._mans.Add(man);
        }

        public void Update(Mans man) {
            db.Entry(man).State = EntityState.Modified;
        }

        public void Delete(int id) {
            Mans mans = db._mans.Find(id);
            if (mans != null)
                db._mans.Remove(mans);
        }

        public void Save() {
            db.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing) {
            if (!this.disposed) {
                if (disposing) {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
