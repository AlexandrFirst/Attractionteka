using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using MusicAppApi;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace Astalavista.IntegrationTests
{
    public class IntegrationTest
    {
        protected readonly HttpClient TestClient;

        protected IntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder =>
                    builder.ConfigureServices(services =>
                    {
                        services.RemoveAll(typeof(MyDataContext));
                        services.AddDbContext<MyDataContext>(options =>
                        {
                            options.UseInMemoryDatabase("TestDB");
                        });
                    }));

            TestClient = appFactory.CreateClient();
        }

        protected async Task AuthenticateAsync()
        {
            TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", await GetJwtAsync());
        }

        private async Task<string> GetJwtAsync()
        {
            var response = await TestClient.PostAsJsonAsync("http://localhost:5000/Auth/nativeLogin", new UserLoginInputDto()
            {
               UserPassword = "12345",
               UserMail = "test@mail.com"
            });

            var authResponse = await response.Content.ReadAsAsync<UserLoginOutputDto>();

            return authResponse.UserToken;
        }
    }
}