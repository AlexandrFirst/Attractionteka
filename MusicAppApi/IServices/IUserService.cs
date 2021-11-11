using System.Threading.Tasks;
using MusicAppApi.DTOs;
using MusicAppApi.Entities;
using MusicAppApi.Helpers;
using MusicAppApi.Models;

namespace MusicAppApi.IServices
{
    public interface IUserService
    {
        Task<User> GetUserById(int userId);
        Task<UserDto> UpdateUserInfo(UpdateUserInfo userInfo, int userId);
        Task<UserDto> UpdatePassword(int userId, UpdatePasswordDto updatePasswordDto, string token);
        Task GenerateToken(int userId);
        Task<bool> IsTokenValid(int userId, string token);
    }
}