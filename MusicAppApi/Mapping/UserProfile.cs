using AutoMapper;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.DTOProfile
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<NativeUserRegisterDto, User>();
        }
    }
}