using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicAppApi.Models
{
    public class MediaCategory
    {
        public static readonly String PhotoCategory = new MediaCategory("photo").Category;
        public static readonly String VideoCategory = new MediaCategory("video").Category;
        public static readonly String AudioCategory = new MediaCategory("audio").Category;
        private readonly string category;
        public String Category
        {
            get
            {
                return this.category;
            }
        }
        private MediaCategory(string category)
        {
            this.category = category;

        }
    }

    public abstract class MediaFile
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public PlaceDescription PlaceDescription { get; set; }
        public DateTime UploadTime { get; set; }
    }
}