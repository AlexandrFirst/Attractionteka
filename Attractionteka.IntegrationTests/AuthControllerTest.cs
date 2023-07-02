using System.Threading.Tasks;
using MusicAppApi.DTOs;
using System.Net.Http.Json;
using System.Net.Http;
using Xunit;
using FluentAssertions;
using MusicAppApi.Models;

namespace Astalavista.IntegrationTests
{
    public class AuthControllerTest : IntegrationTest
    {
        [Fact]
        public async Task AuthenticateUser()
        {
            //Given
            var authInput = new UserLoginInputDto()
            {
                UserMail = "test@mail.com",
                UserPassword = "12345"
            };

            //When
            var result = await TestClient.PostAsJsonAsync("http://localhost:5000/Auth/nativeLogin", authInput);
            
            var content = result.Content.ReadAsAsync<UserLoginOutputDto>();
            //Then
            content.Should().NotBe(null);
        }

        [Fact]
        public async Task RegisterUser()
        {
            //Given
            var registerInput = new InputUserDto()
            {
                Mail = "test2@mail.com",
                Name = "Alex2",
                Password = "7890",
                Surname = "Best"
            };

            //When
            var result = await TestClient.PostAsJsonAsync("http://localhost:5000/Auth/nativeRegister", registerInput);
            
            var content = result.Content.ReadAsAsync<User>();
            //Then
            content.Should().NotBe(null);
        }
    }
}