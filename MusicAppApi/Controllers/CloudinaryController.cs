using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.IServices;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CloudinaryController : ControllerBase
    {
        private readonly ICloudinaryService cloudinaryService;

        public CloudinaryController(ICloudinaryService cloudinaryService)
        {
            this.cloudinaryService = cloudinaryService;
        }

        [HttpPost("audio")]
        public async Task<IActionResult> SetAudioForText([FromForm] IFormFile audio)
        {
            var result = await cloudinaryService.UploadMusic(audio);

            return Ok(result);
        }

        [HttpPost("video")]
        public async Task<IActionResult> SetVideoText([FromForm] IFormFile video)
        {
            var result = await cloudinaryService.UploadVideo(video);

            return Ok(result);
        }

        [HttpPost("photo")]
        public async Task<IActionResult> SetPhotoText([FromForm] IFormFile photo)
        {
            var result = await cloudinaryService.UploadPhoto(photo);
            return Ok(result);
        }
    }
}