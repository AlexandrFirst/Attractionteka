using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace MusicAppApi.MediaContentHelpers.Entities
{
    public class PhotoContentUploader: MediaContentUploader
    {
        public PhotoContentUploader(Cloudinary cloudinary) : base(cloudinary)
        {
        }

        protected async override Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadParams fileParams)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(fileParams.Name, fileParams.DataStream)
            };
            ImageUploadResult result = await cloudinary.UploadAsync(uploadParams);

            return result;
        }
    }
}