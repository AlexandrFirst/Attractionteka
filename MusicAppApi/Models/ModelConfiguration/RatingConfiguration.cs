using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MusicAppApi.Models.ModelConfiguration
{
    public class RatingConfiguration : IEntityTypeConfiguration<UserPlaceRating>
    {
        public void Configure(EntityTypeBuilder<UserPlaceRating> builder)
        {
            builder.HasOne(r => r.Place)
                .WithMany(p => p.Ratings)
                .HasForeignKey(r => r.PlaceId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasAlternateKey(a => new { a.PlaceId, a.UserId });
        }
    }
}