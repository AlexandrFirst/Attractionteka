using System.Collections.Generic;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MusicAppApi.Models.ModelConfiguration
{
    public class PlaceDescribtionConfiguration : IEntityTypeConfiguration<PlaceDescription>
    {
        public void Configure(EntityTypeBuilder<PlaceDescription> builder)
        {
            builder.HasMany(a => a.Audios)
                    .WithOne(u => u.PlaceDescription)
                    .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(a => a.Videos)
                    .WithOne(u => u.PlaceDescription)
                    .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(a => a.Photos)
                    .WithOne(u => u.PlaceDescription)
                    .OnDelete(DeleteBehavior.Cascade);
        
        }
    }
}