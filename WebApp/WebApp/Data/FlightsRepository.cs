using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data {
    public class FlightsRepository : IRepository<Flights> {
        private ApplicationDbContext db;

        public FlightsRepository() {
            this.db = new ApplicationDbContext(ApplicationDbContext._options, ApplicationDbContext._operationalStoreOptions);
        }

        public IEnumerable<Flights> GetList() {
            return db.Flights;
        }

        public Flights GetElement(int id) {
            return db.Flights.Find(id);
        }

        public void Create(Flights flight) {
            db.Flights.Add(flight);
        }

        public void Update(Flights flight) {
            db.Entry(flight).State = EntityState.Modified;
        }

        public void Delete(int id) {
            Flights flight = db.Flights.Find(id);
            if (flight != null)
                db.Flights.Remove(flight);
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
