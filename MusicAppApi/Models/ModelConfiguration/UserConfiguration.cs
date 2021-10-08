using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MusicAppApi.Models.ModelConfiguration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.Mail)
                   .IsUnique();

            builder.HasMany(m => m.PlaceDescriptions)
                    .WithOne(u => u.Author);

            builder.HasMany(c => c.Comments)
            .WithOne(u => u.Author);
        }
    }
}