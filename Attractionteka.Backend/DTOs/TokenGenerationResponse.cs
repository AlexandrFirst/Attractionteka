using System;

namespace MusicAppApi.DTOs
{
    public class TokenGenerationResponse
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}