using System;

namespace MusicAppApi.Models
{
    public class UserPlaceRating
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public double Rating { get; set; }
        public int? PlaceId { get; set; }
        public PlaceDescription Place { get; set; }
    }
}