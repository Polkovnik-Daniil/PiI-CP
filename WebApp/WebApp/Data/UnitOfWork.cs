namespace WebApp.Data {
    public class UnitOfWork {
        private ApplicationDbContext db = new ApplicationDbContext(ApplicationDbContext._options,
                                                                   ApplicationDbContext._operationalStoreOptions);
        private AirplanesRepository _airplanes;
        private FlightsRepository _flights;
        private MansRepository _mans;
        private TicketsRepository _tickets;

        public AirplanesRepository Airplanes {
            get {
                if(_airplanes == null) {
                    _airplanes = new AirplanesRepository(db);
                }
                return _airplanes;
            }
        }

        public FlightsRepository Flights {
            get {
                if(_flights == null) {
                    _flights = new FlightsRepository(db);
                }
                return _flights;
            }
        }
        
        public MansRepository Mans {
            get {
                if (_mans == null) {
                    _mans= new MansRepository(db);
                }
                return _mans; 
            }
        }

        public TicketsRepository Ticket {
            get {
                if (_tickets == null) {
                    _tickets= new TicketsRepository(db);
                }
                return _tickets;
            }
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
                this.disposed = true;
            }
        }

        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
