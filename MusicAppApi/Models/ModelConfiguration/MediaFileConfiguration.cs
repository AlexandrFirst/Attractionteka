using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MusicAppApi.Models.ModelConfiguration
{
    public class MediaFileConfiguration<TEntity> : IEntityTypeConfiguration<TEntity>
        where TEntity : MediaFile
    {
        public void Configure(EntityTypeBuilder<TEntity> builder)
        {
           builder.Property(m => m.UploadTime).HasDefaultValue(DateTime.Now);  
        }
    }
}