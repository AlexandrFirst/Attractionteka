using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.DTOs;
using MusicAppApi.IServices;
using MusicAppApi.Models;


namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }


        [HttpPost("nativeRegister")]
        public async Task<IActionResult> RegisterUsers([FromBody] NativeUserRegisterDto userRegisterData){
            
            User newUser = await authService.NativeRegister(userRegisterData);
            
            return Ok(newUser);
        }


        [HttpPost("nativeLogin")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginInputDto userRegisterData){
            
            UserLoginOutputDto registerResult = await authService.NativeLogin(userRegisterData);
            
            return Ok(registerResult);
        }
    }
}