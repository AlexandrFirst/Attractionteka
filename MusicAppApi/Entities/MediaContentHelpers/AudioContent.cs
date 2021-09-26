using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace MusicAppApi.MediaContentHelpers.Entities
{
    public class AudioContent : MediaContent
    {
        public AudioContent(Cloudinary cloudinary) : base(cloudinary)
        {
        }

        protected async override Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadParams param)
        {
            var uploadParams = new RawUploadParams()
            {
                File = new FileDescription(param.Name, param.DataStream)
            };
            RawUploadResult result = await cloudinary.UploadAsync(uploadParams);

            return result;
        }
    }
}