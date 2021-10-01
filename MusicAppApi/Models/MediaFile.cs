using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicAppApi.Models
{
    public abstract class MediaFile
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public PlaceDescription PlaceDescription { get; set; }
        public DateTime UploadTime { get; set; }
    }
}