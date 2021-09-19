using Microsoft.EntityFrameworkCore;

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


    }
}