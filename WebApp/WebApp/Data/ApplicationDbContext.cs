using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApp.Models;
using static IdentityModel.ClaimComparer;

namespace WebApp.Data {
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser> {
        public static DbContextOptions _options;
        public static IOptions<OperationalStoreOptions> _operationalStoreOptions;

        public DbSet<Airplanes> Airplanes { get; set; }
        public DbSet<Flights> Flights { get; set; }
        public DbSet<Mans> Mans { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions) {
            _options = options;
            _operationalStoreOptions = operationalStoreOptions;
        }
    }
}