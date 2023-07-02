namespace MusicAppApi.DTOs
{
    public class UserLoginOutputDto
    {
        public int UserId { get; set; }
        public string UserToken { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Mail { get; set; }
    }
}