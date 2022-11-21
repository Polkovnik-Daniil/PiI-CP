using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data {
    public class AirplanesRepository : IRepository<Airplanes>{
        private ApplicationDbContext db;

        public AirplanesRepository() {
            this.db = new ApplicationDbContext(ApplicationDbContext._options, ApplicationDbContext._operationalStoreOptions);
        }

        public IEnumerable<Airplanes> GetList() {
            return db._airplanes;
        }

        public Airplanes GetElement(int id) {
            return db._airplanes.Find(id);
        }

        public void Create(Airplanes airplane) {
            db._airplanes.Add(airplane);
        }

        public void Update(Airplanes airplanes) {
            db.Entry(airplanes).State = EntityState.Modified;
        }

        public void Delete(int id) {
            Airplanes airplanes = db._airplanes.Find(id);
            if (airplanes != null)
                db._airplanes.Remove(airplanes);
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
