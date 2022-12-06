using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data {
    public class AirplanesRepository : IRepository<Airplanes>{
        private ApplicationDbContext db;

        public AirplanesRepository() {
            this.db = new ApplicationDbContext(ApplicationDbContext._options, ApplicationDbContext._operationalStoreOptions);
        }

        public IEnumerable<Airplanes> GetList() {
            return db.Airplanes;
        }

        public Airplanes GetElement(string id) {
            return db.Airplanes.Find(id);
        }

        public void Create(Airplanes airplane) {
            db.Airplanes.Add(airplane);
        }

        public void Update(Airplanes airplanes) {
            db.Entry(airplanes).State = EntityState.Modified;
        }

        public void Delete(string id) {
            Airplanes airplanes = db.Airplanes.Find(id);
            if (airplanes != null)
                db.Airplanes.Remove(airplanes);
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
