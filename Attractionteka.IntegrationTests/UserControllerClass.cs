using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using MusicAppApi.Models;
using Xunit;

namespace Astalavista.IntegrationTests
{
    public class UserControllerClass: IntegrationTest
    {
        [Fact]
        public async Task GetUserById()
        {
            //Arrange
            await AuthenticateAsync();

            //Act   
            var response = await TestClient.GetAsync("http://localhost:5000/User/user/1");
            
            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            (await response.Content.ReadAsAsync<User>()).Should().NotBe(null);

        }
    }
}