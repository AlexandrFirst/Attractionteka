using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly MyDataContext myDataContext;

        public AuthService(MyDataContext myDataContext)
        {
            this.myDataContext = myDataContext;
        }

        public async Task<User> GetName()
        {
            User newUser = new User()
            {
                Mail = "kek@mail.com",
                Name = "Alex",
                Password = "1234",
                Surname = "OverTheTop"
            };

            await myDataContext.Users.AddAsync(newUser);
            await myDataContext.SaveChangesAsync();

            return newUser;
        }
    }
}