using System.Threading.Tasks;
using MusicAppApi.DTOs;
using MusicAppApi.Models;
using MusicAppApi.Entities;
namespace MusicAppApi.IServices
{
    public interface IAuthService
    {
        Task<User> NativeRegister(NativeUserRegisterDto userData);
        Task<UserLoginOutputDto> NativeLogin(UserLoginInputDto model);
        HttpUserContext GetUserContext(int userId);
    }
}