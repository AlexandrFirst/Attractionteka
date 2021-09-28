using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MusicAppApi.Entities;
using MusicAppApi.IServices;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MusicAppApi.DTOs;
using System;
using MusicAppApi.MediaContentHelpers.Entities;

namespace MusicAppApi.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private Cloudinary cloudinary;

        public CloudinaryService(IOptions<CloudinarySettings> cloudinarySettings)
        {
            var cloudinaryAccount = new Account(cloudinarySettings.Value.CloudName,
                                                cloudinarySettings.Value.APIKey,
                                                cloudinarySettings.Value.APISecret);

            cloudinary = new Cloudinary(cloudinaryAccount);
            cloudinary.Api.Secure = true;
        }

        public Task DeleteMusic(string musicPublicId)
        {
            throw new System.NotImplementedException();
        }

        public Task DeletePhoto(string musicPublicId)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteVideo(string musicPublicId)
        {
            throw new System.NotImplementedException();
        }

        public Task GetMusic(string musicPublicId)
        {
            throw new System.NotImplementedException();
        }

        public Task GetPhoto(string musicPublicId)
        {
            throw new System.NotImplementedException();
        }

        public Task GetVideo(string musicPublicId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<UploadResultDto> UploadMusic(IFormFile music)
        {
            return await uploadMedia(new AudioContentUploader(cloudinary), music);
        }

        public async Task<UploadResultDto> UploadPhoto(IFormFile photo)
        {
            return await uploadMedia(new PhotoContentUploader(cloudinary), photo);
        }

        public async Task<UploadResultDto> UploadVideo(IFormFile video)
        {
            return await uploadMedia(new VideoContentUploader(cloudinary), video);
        }

        private async Task<UploadResultDto> uploadMedia(MediaContentUploader mediaContent, IFormFile file)
        {
            return await mediaContent.UploadContent(file);
        }

    }
}