using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.Helpers;
using MusicAppApi.IServices;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [Authorize(Role="User")]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await userService.GetUserById(userId);
            if(user == null)
                throw new Exception("User not found");

             return Ok(user);
        }
    }
}