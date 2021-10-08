using System;
using System.Collections.Generic;

namespace MusicAppApi.Models
{
    public class Comment
    {
        public Comment()
        {
            CommentReplies = new List<Comment>();
        }
        public int Id { get; set; }
        public string Content { get; set; }
        public User Author { get; set; }
        public DateTime CommentTime { get; set; }
        public PlaceDescription Place { get; set; }
        public List<Comment> CommentReplies { get; set; }
        public Comment ParentComment { get; set; }
    }
}