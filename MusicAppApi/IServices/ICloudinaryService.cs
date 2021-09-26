using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MusicAppApi.DTOs;

namespace MusicAppApi.IServices
{
    public interface ICloudinaryService
    {
         Task<UploadResultDto> UploadMusic(IFormFile music);
         Task DeleteMusic(string musicPublicId);
         Task GetMusic(string musicPublicId);

         Task<UploadResultDto> UploadVideo(IFormFile music);
         Task DeleteVideo(string musicPublicId);
         Task GetVideo(string musicPublicId);

         Task<UploadResultDto> UploadPhoto(IFormFile music);
         Task DeletePhoto(string musicPublicId);
         Task GetPhoto(string musicPublicId);

    }
}