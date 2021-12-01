using System;
using System.Collections.Generic;

namespace MusicAppApi.DTOs
{
    public class PlaceDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public List<string> ListKeyWords { get; set; }
        public int ViewNumber { get; set; }
        public DateTime UploadTime { get; set; }
        public HashSet<MediaFileDto> Photos { get; set; }
        public HashSet<MediaFileDto> Videos { get; set; }
        public HashSet<MediaFileDto> Audios { get; set; }
    }
}