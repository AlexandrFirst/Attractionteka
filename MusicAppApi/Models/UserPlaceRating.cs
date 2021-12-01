namespace MusicAppApi.Models
{
    public class UserPlaceRating
    {
        public int Id { get; set; }
        public User User { get; set; }
        public PlaceDescription Place { get; set; }
    }
}