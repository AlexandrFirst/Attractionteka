using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public async Task<IActionResult> GetName()
        {
            User newUser = await authService.GetName();

            return BadRequest(newUser);
        }
    }
}