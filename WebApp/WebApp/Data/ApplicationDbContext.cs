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

        public DbSet<Airplanes> _airplanes { get; set; }
        public DbSet<Flights> _flights { get; set; }
        public DbSet<Mans> _mans { get; set; }
        public DbSet<Tickets> _tickets { get; set; }
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions) {
            _options = options;
            _operationalStoreOptions = operationalStoreOptions;
        }
    }
}