using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public class UserService : IUserService
    {
        private readonly MyDataContext context;

        public UserService(MyDataContext context)
        {
            this.context = context;
        }

        public async Task<User> GetUserById(int userId)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}