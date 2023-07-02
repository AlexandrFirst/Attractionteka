using System;
using System.Collections.Generic;

namespace MusicAppApi.Models
{
    public class PlaceDescription
    {
        public PlaceDescription()
        {
            Photos = new HashSet<PhotoFile>();
            Videos = new HashSet<VideoFile>();
            Audios = new HashSet<AudioFile>();
            Comments = new HashSet<Comment>();
            Ratings = new HashSet<UserPlaceRating>();
            UserVisits = new HashSet<UserVisitHistory>();
        }

        public int Id { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string KeyWords { get; set; }
        public User Author { get; set; }
        public int ViewNumber { get; set; }
        public DateTime UploadTime { get; set; }
        public HashSet<UserPlaceRating> Ratings { get; set; }
        public HashSet<PhotoFile> Photos { get; set; }
        public HashSet<VideoFile> Videos { get; set; }
        public HashSet<AudioFile> Audios { get; set; }
        public HashSet<Comment> Comments { get; set; }
        public HashSet<UserVisitHistory> UserVisits { get; set; }
    }
}