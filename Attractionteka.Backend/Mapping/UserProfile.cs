using AutoMapper;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.DTOProfile
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<InputUserDto, User>();
            CreateMap<UpdateUserInfo, User>();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserVisitHistory, UserVisistHistoryDto>();
        }
    }
}