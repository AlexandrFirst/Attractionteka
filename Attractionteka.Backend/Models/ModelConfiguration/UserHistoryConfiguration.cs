using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MusicAppApi.Models.ModelConfiguration
{
    public class UserHistoryConfiguration : IEntityTypeConfiguration<UserVisitHistory>
    {
        public void Configure(EntityTypeBuilder<UserVisitHistory> builder)
        {
            builder.HasOne(p => p.VisitedPlace)
                .WithMany(u => u.UserVisits)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.User)
                .WithMany(h => h.PlaceVisits)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(h => h.VisitTime).HasDefaultValue(DateTime.Now);
        }
    }
}