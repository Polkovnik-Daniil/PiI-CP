using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data {
    public class FlightsRepository : IRepository<Flights> {
        private ApplicationDbContext db;

        public FlightsRepository() {
            this.db = new ApplicationDbContext(ApplicationDbContext._options, ApplicationDbContext._operationalStoreOptions);
        }

        public IEnumerable<Flights> GetList() {
            return db._flights;
        }

        public Flights GetElement(int id) {
            return db._flights.Find(id);
        }

        public void Create(Flights flight) {
            db._flights.Add(flight);
        }

        public void Update(Flights flight) {
            db.Entry(flight).State = EntityState.Modified;
        }

        public void Delete(int id) {
            Flights flight = db._flights.Find(id);
            if (flight != null)
                db._flights.Remove(flight);
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
