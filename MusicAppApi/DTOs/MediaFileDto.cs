using System;

namespace MusicAppApi.DTOs
{
    public class MediaFileDto
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public DateTime UploadTime { get; set; }
    }
}