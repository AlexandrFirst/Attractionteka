using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.DTOs;
using MusicAppApi.HelperDtos;
using MusicAppApi.Models;

namespace MusicAppApi.IServices
{
    public interface IAuthService
    {
        Task<User> NativeRegister(NativeUserRegisterDto userData);
        Task<UserLoginOutputDto> NativeLogin(UserLoginInputDto model);
        HttpUserContext GetUserContext(int userId);
    }
}