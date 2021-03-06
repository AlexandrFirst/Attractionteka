using System.Linq;
using AutoMapper;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers.Extensions.RatingExtension;
using MusicAppApi.Models;

namespace MusicAppApi.Mapping
{
    public class PlaceProfile : Profile
    {
        public PlaceProfile()
        {
            CreateMap<PlaceDescription, PlaceDto>()
                    .ForMember(k => k.ListKeyWords,
                    memberOptions => memberOptions.MapFrom(dto => dto.KeyWords.Split(',', System.StringSplitOptions.RemoveEmptyEntries).ToList<string>()))
                    .ForMember(k => k.AverageRating, m => m.Ignore());


            CreateMap<PlaceDto, PlaceDescription>()
                    .ForMember(k => k.KeyWords,
                    memberOptions => memberOptions.MapFrom(dto => string.Join(',', dto.ListKeyWords) + ","));

            CreateMap<PlaceDescription, PlaceReadOnlyDto>();
            CreateMap<UserPlaceRating, RatingDto>();
        }
    }
}