using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CloudinaryController : ControllerBase
    {
        private readonly ICloudinaryService cloudinaryService;
        private readonly MyDataContext dataContext;

        public CloudinaryController(ICloudinaryService cloudinaryService, MyDataContext dataContext)
        {
            this.cloudinaryService = cloudinaryService;
            this.dataContext = dataContext;
        }

        [HttpPost("audio")]
        public async Task<IActionResult> AddAudioFile([FromForm] IFormFile media)
        {
            var result = await cloudinaryService.UploadMusic(media);
            var newAudioFile = new AudioFile()
            {
                PublicId = result.PublicId,
                Url = result.Url
            };
            
            await dataContext.AudioFiles.AddAsync(newAudioFile);
            await dataContext.SaveChangesAsync();

            return Ok(newAudioFile);
        }

        [HttpPost("video")]
        public async Task<IActionResult> AddVideoFile([FromForm] IFormFile media)
        {
            var result = await cloudinaryService.UploadVideo(media);
            var newVideoFile = new VideoFile()
            {
                PublicId = result.PublicId,
                Url = result.Url
            };
            
            await dataContext.VideoFiles.AddAsync(newVideoFile);
            await dataContext.SaveChangesAsync();

            return Ok(newVideoFile);
        }

        [HttpPost("photo")]
        public async Task<IActionResult> AddImageFile([FromForm] IFormFile media)
        {
            var result = await cloudinaryService.UploadPhoto(media);
            
            var newImageFile = new PhotoFile()
            {
                PublicId = result.PublicId,
                Url = result.Url
            };
            
            await dataContext.PhotoFiles.AddAsync(newImageFile);
            await dataContext.SaveChangesAsync();

        
            return Ok(newImageFile);
        }

        [HttpDelete("media/{category}/{publicId}")]
        public async Task<IActionResult> DeleteMedia(string category,string publicId)
        {
            IQueryable<MediaFile> placeToDelete = null;
            if(category == "photo")
            {
                placeToDelete = dataContext.PhotoFiles;
            }
            else if(category == "video")
            {
                placeToDelete = dataContext.VideoFiles;
            }
            else if(category == "audio")
            {
                placeToDelete = dataContext.AudioFiles;
            }
            else{
                throw new System.Exception("Category to delete not found");
            }

            var mediaFileToDelete = await placeToDelete.FirstOrDefaultAsync(m => m.PublicId == publicId);
            dataContext.Remove(mediaFileToDelete);
            await dataContext.SaveChangesAsync();
            
            var result = await cloudinaryService.DeleteFile(publicId);
            return Ok(result);
        }
    }
}