using System.IO;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using MusicAppApi.DTOs;

namespace MusicAppApi.IServices
{
    public interface ICloudinaryService
    {
         Task<UploadResultDto> UploadMusic(IFormFile music);
         Task<DeletionResult> DeleteFile(string filePublicId, string category);
         Task<UploadResultDto> UploadVideo(IFormFile music);
         Task<UploadResultDto> UploadPhoto(IFormFile music);
    }
}