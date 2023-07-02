using System.IO;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace MusicAppApi.MediaContentHelpers.Entities
{
    public class VideoContentUploader : MediaContentUploader
    {
        public VideoContentUploader(Cloudinary cloudinary) : base(cloudinary)
        {
        }

        protected async override Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadParams fileParams)
        {
            var uploadParams = new VideoUploadParams()
            {
                File = new FileDescription(fileParams.Name, fileParams.DataStream)
            };

            VideoUploadResult result = null;

            if (fileParams.Size >= 100 * 1024)
            {
                result = await cloudinary.UploadLargeAsync(uploadParams);
            }
            else
            {
                result = await cloudinary.UploadAsync(uploadParams);
            }

            return result;
        }
    }
}