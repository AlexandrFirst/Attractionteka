using AutoMapper;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.Mapping
{
    public class CommentProfile: Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDto>();
        }
    }
}