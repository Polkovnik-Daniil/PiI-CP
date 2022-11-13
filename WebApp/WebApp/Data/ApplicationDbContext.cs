using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace WebApp.Data {
    public class ApplicationDbContext : IdentityDbContext {
        private ApplicationDbContext _instance;
        public DbSet<IdentityRole>? _roles { get; set; }
        public DbSet<IdentityUser>? _users { get; set; }
        public DbSet<IdentityUserRole<String>>? _userRoles { get; set; }
        public DbSet<Airplanes> _airplanes { get; set; }
        public DbSet<Flights> _flights { get; set; }
        public DbSet<Tickets> _tickets { get; set; }
        public DbSet<Mans> _mans { get; set; }
        public ApplicationDbContext getInstance(DbContextOptions<ApplicationDbContext> options) {
            if(_instance == null) {
                _instance = new ApplicationDbContext(options);
            }
            return _instance;
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {
        }
    }
}