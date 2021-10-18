using System.Threading.Tasks;
using MusicAppApi.Models;

namespace MusicAppApi.IServices
{
    public interface IUserService
    {
         Task<User> GetUserById(int userId);
    }
}