using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.Models;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MyDataContext myDataConetex;

        public AuthController(MyDataContext myDataConetx)
        {
            this.myDataConetex = myDataConetx;
        }

        [HttpGet]
        public async Task<IActionResult> GetName()
        {
            User newUser = new User()
            {
                Mail = "kek@mail.com",
                Name = "Alex",
                Password = "1234",
                Surname = "OverTheTop"
            };

            await myDataConetex.Users.AddAsync(newUser);
            await myDataConetex.SaveChangesAsync();

            return Ok(newUser);
        }
    }
}