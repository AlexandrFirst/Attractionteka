using AutoMapper;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.Mapping
{
    public class MediaFileProfile : Profile
    {
        public MediaFileProfile()
        {
            CreateMap<MediaFile, MediaFileDto>().ReverseMap();
        }
    }
}