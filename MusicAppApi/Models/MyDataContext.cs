using System;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.Models.ModelConfiguration;

namespace MusicAppApi.Models
{
    public class MyDataContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<AudioFile> AudioFiles { get; set; }
        public virtual DbSet<VideoFile> VideoFiles { get; set; }
        public virtual DbSet<PhotoFile> PhotoFiles { get; set; }
        public virtual DbSet<PlaceDescription> PlaceDescriptions { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<UserPlaceRating> Ratings { get; set; }

        public MyDataContext(DbContextOptions<MyDataContext> options) : base(options)
        {
            Database.Migrate();
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MediaFileConfiguration<AudioFile>());
            modelBuilder.ApplyConfiguration(new MediaFileConfiguration<VideoFile>());
            modelBuilder.ApplyConfiguration(new MediaFileConfiguration<PhotoFile>());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new PlaceDescribtionConfiguration());
            modelBuilder.ApplyConfiguration(new CommentConfiguration());
        }



    }
}