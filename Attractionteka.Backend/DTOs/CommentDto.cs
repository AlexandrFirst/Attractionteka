using System;
using System.Collections.Generic;

namespace MusicAppApi.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public UserDto Author { get; set; }
        public DateTime CommentTime { get; set; }
        public PlaceDto Place { get; set; }
        public List<CommentDto> CommentReplies { get; set; }
        public CommentDto ParentComment { get; set; }
    }
}