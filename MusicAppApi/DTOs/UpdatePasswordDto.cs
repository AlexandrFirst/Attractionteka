namespace MusicAppApi.DTOs
{
    public class UpdatePasswordDto
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }


    public class RestorePasswordDto
    {
        public string NewPassword { get; set; }
    }
}