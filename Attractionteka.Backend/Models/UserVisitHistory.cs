using System;

namespace MusicAppApi.Models
{
    public class UserVisitHistory
    {
        public int Id { get; set; }
        public User User { get; set; }
        public PlaceDescription VisitedPlace { get; set; }
        public DateTime VisitTime { get; set; }
    }
}