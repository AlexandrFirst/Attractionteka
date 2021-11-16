using System.Threading.Tasks;
using MusicAppApi.Entities;
using MusicAppApi.Helpers;

namespace MusicAppApi.IServices
{
    public interface ITempSaverService
    {
         Task<TempSavedEntity<UserChangePasswordToken>> GenerateUserToken(UserChangePasswordToken userToken);
         Task<bool> IsUserTokenValid(UserChangePasswordToken userToken);
         Task<int> GetUserIdByToken(string token);
         Task<bool> RemoveToken(int userId);
    }
}