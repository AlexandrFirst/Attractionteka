using System.IO;

namespace MusicAppApi.MediaContentHelpers.Entities
{
    public class FileUploadParams
    {
        public Stream DataStream { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
    }
}