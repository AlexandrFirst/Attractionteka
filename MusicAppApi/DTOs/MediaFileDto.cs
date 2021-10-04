using System;

namespace MusicAppApi.DTOs
{
    public class MediaFileDto
    {
        public string PublicId { get; set; }
        public string Url { get; set; }
        public DateTime UploadTime { get; set; }
    }
}