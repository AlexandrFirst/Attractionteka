using Microsoft.EntityFrameworkCore;
using MusicAppApi.Models.ModelConfiguration;

namespace MusicAppApi.Models
{
    public class MyDataContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public MyDataContext(DbContextOptions<MyDataContext> options) : base(options)
        {
            Database.Migrate();
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder){
             modelBuilder.ApplyConfiguration(new UserConfiguration());
         }


    }
}