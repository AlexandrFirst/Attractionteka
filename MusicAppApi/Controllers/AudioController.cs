using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.Helpers;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AudioController : ControllerBase
    {
        public AudioController()
        {

        }


        [Authorize]
        [HttpGet("audio/{textId}")]
        public async Task<IActionResult> GetAudioForText(int textId)
        {
            return Ok("The audio is get");
        }

        [Authorize(Role="Admin")]
        [HttpPost("audio/{textId}")]
        public async Task<IActionResult> SetAudioForText(int textId)
        {
            return Ok("The audio is set");
        }
    }
}