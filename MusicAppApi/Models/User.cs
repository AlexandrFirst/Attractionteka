namespace MusicAppApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Mail { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
    }
}