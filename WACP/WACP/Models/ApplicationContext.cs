using Microsoft.EntityFrameworkCore;

namespace WACP.Models {
    public class ApplicationContext : DbContext{
        public DbSet<Groups> groups { get; set; }
        public DbSet<Attributes> attributes { get; set; }
        public DbSet<Users> users { get; set; }


        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options) {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}
