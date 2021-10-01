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
        }

        public int Id { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string KeyWords { get; set; }
        public User Author { get; set; }
        public DateTime UploadTime { get; set; }
        public HashSet<PhotoFile> Photos { get; set; }
        public HashSet<VideoFile> Videos { get; set; }
        public HashSet<AudioFile> Audios { get; set; }
    }
}