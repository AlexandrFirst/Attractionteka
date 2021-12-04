using System.Collections.Generic;

namespace MusicAppApi.Models
{
    public class User
    {
        public User()
        {
            PlaceDescriptions = new HashSet<PlaceDescription>();
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Mail { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public bool IsBanned { get; set; }
        public HashSet<PlaceDescription> PlaceDescriptions { get; set; }
        public HashSet<Comment> Comments { get; set; }
        public HashSet<UserPlaceRating> Ratings { get; set; }
    }
}