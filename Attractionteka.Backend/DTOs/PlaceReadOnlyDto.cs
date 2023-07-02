using System;
using System.Collections.Generic;

namespace MusicAppApi.DTOs
{
    public class PlaceReadOnlyDto
    {
        public int Id { get; set; }
         public string Content { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public List<string> ListKeyWords { get; set; }
        public UserDto Author { get; set; }
        public DateTime UploadTime { get; set; }
    }
}