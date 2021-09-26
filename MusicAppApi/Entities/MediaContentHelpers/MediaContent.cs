using System;
using System.IO;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using MusicAppApi.DTOs;

namespace MusicAppApi.MediaContentHelpers.Entities
{
    public abstract class MediaContent
    {
        private readonly Cloudinary cloudinary;

        public MediaContent(Cloudinary cloudinary)
        {
            this.cloudinary = cloudinary;
        }

        public async Task<UploadResultDto> UploadContent(IFormFile file)
        {
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var result = await MyUpload(cloudinary, new FileUploadParams()
                    {
                        DataStream = stream,
                        Name = file.FileName,
                        Size = file.Length
                    });

                    return new UploadResultDto()
                    {
                        Name = file.Name,
                        PublicId = result.PublicId,
                        Url = result.Url.ToString()
                    };
                }
            }
            else
            {
                throw new Exception("Zero length");
            }
        }


        protected abstract Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadParams param);
    }
}