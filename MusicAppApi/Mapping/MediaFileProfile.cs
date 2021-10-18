using AutoMapper;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.Mapping
{
    public class MediaFileProfile : Profile
    {
        public MediaFileProfile()
        {
            CreateMap<AudioFile, MediaFileDto>().ReverseMap();
            CreateMap<VideoFile, MediaFileDto>().ReverseMap();
            CreateMap<PhotoFile, MediaFileDto>().ReverseMap();
        }
    }
}