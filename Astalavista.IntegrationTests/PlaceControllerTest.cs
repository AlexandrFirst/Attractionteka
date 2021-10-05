using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Astalavista.IntegrationTests.MockModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.DTOs;
using MusicAppApi.Models;
using Xunit;

namespace Astalavista.IntegrationTests
{
    public class PlaceControllerTest : IntegrationTest
    {
        string photoPath = @"photo1.jpg.jpg";
        string videoPath = @"video1.mp4";
        string audioPath = @"music1.mp3";

        private string GetTestPath(string relativePath)
        {
            var codeBaseUrl = new Uri(Assembly.GetExecutingAssembly().Location);
            var codeBasePath = Uri.UnescapeDataString(codeBaseUrl.AbsolutePath);
            var dirPath = Path.GetDirectoryName(codeBasePath);
            return Path.Combine(dirPath, "Astalavista.IntegrationTests", relativePath);
        }

        public async Task<MediaFileDto> uploadFile(string path, string url)
        {
            HttpResponseMessage response;
            using (var file1 = File.OpenRead(path))
            using (var content1 = new StreamContent(file1))

            using (var formData = new MultipartFormDataContent())
            {
                formData.Add(content1, "media", url);

                response = await TestClient.PostAsync(url, formData);
            }

            response.EnsureSuccessStatusCode();
            string responseString = await response.Content.ReadAsStringAsync();
            var responseObject = JsonSerializer.Deserialize<MockMediaFileDto>(responseString);
            response.Dispose();

            return new MediaFileDto()
            {
                Id = responseObject.id,
                PublicId = responseObject.publicId,
                Url = responseObject.url,
                UploadTime = DateTime.Now
            };
        }

        [Fact]
        public async Task PhotoAddingTest()
        {
            //Given
            //await AuthenticateAsync();

            // string path = GetTestPath("UploadMedia\\photo1.jpg");
            // System.Console.WriteLine(path);
            bool isFileExists = File.Exists(photoPath);
            Assert.True(isFileExists);

            var uploadedPhoto = await uploadFile(photoPath, "http://localhost:5000/Cloudinary/photo");

            Assert.NotNull(uploadedPhoto);
        }

        [Fact]
        public async Task VideoAddingTest()
        {
            //Given
            //await AuthenticateAsync();

            // string path = GetTestPath("UploadMedia\\photo1.jpg");
            // System.Console.WriteLine(path);
            bool isFileExists = File.Exists(videoPath);
            Assert.True(isFileExists);

            var uploadedVideo = await uploadFile(videoPath, "http://localhost:5000/Cloudinary/video");

            Assert.NotNull(uploadedVideo);
        }

        [Fact]
        public async Task AudioAddingTest()
        {
            //Given
            //await AuthenticateAsync();

            // string path = GetTestPath("UploadMedia\\photo1.jpg");
            // System.Console.WriteLine(path);

            bool isFileExists = File.Exists(audioPath);
            Assert.True(isFileExists);

            var uploadedAudio = await uploadFile(audioPath, "http://localhost:5000/Cloudinary/audio");

            Assert.NotNull(uploadedAudio);
        }

        [Fact]
        public async Task AddNewPlace()
        {
            await AuthenticateAsync();

            List<MediaFileDto> uploadedPhotos = new List<MediaFileDto>();
            List<MediaFileDto> uploadedVideos = new List<MediaFileDto>();
            List<MediaFileDto> uploadedAudios = new List<MediaFileDto>();

            Assert.True(File.Exists(audioPath));
            Assert.True(File.Exists(videoPath));
            Assert.True(File.Exists(photoPath));

            for (int i = 0; i < 3; i++)
            {
                uploadedPhotos.Add(await uploadFile(photoPath, "http://localhost:5000/Cloudinary/photo"));
                uploadedVideos.Add(await uploadFile(videoPath, "http://localhost:5000/Cloudinary/video"));
                uploadedAudios.Add(await uploadFile(audioPath, "http://localhost:5000/Cloudinary/audio"));
            }

            Assert.Equal(uploadedPhotos.Count, 3);
            Assert.Equal(uploadedVideos.Count, 3);
            Assert.Equal(uploadedAudios.Count, 3);

            string inputContentPath = "inputPlaceContent.txt";

            bool isFileExists = File.Exists(inputContentPath);
            Assert.True(isFileExists);

            string insertContent = string.Join("", await File.ReadAllLinesAsync(inputContentPath));
            Assert.NotEmpty(insertContent);

            string shortDescription = "skjhfjhsdgfhjsafjhsagfchjfvbcjhsngfjcsgfhjsh";

            List<string> KeyWords = new List<string> { "sjkdjskd", "sjhdjs", "sjhjshdjshd" };


            var response = await TestClient.GetAsync("http://localhost:5000/User/user/1");

            User retrievedUser = await response.Content.ReadAsAsync<User>();



            Assert.NotNull(retrievedUser);

            UserDto userDto = new UserDto()
            {
                Id = retrievedUser.Id,
                Mail = retrievedUser.Mail,
                Name = retrievedUser.Name,
                Surname = retrievedUser.Surname
            };

            PlaceDto newPlaceDto = new PlaceDto()
            {
                Audios = uploadedAudios.ToHashSet(),
                Videos = uploadedVideos.ToHashSet(),
                Photos = uploadedPhotos.ToHashSet(),
                Author = userDto,
                Content = string.Format(insertContent, uploadedPhotos[0].Url, uploadedPhotos[1].Url,
                                                         uploadedVideos[0].Url, uploadedVideos[1].Url, uploadedVideos[2].Url,
                                                         uploadedAudios[0].Url),
                ListKeyWords = KeyWords,
                Name = "hululu",
                ShortDescription = shortDescription,
                UploadTime = DateTime.Now
            };

            var result = await TestClient.PostAsJsonAsync("http://localhost:5000/Place/newplace", newPlaceDto);
            result.EnsureSuccessStatusCode();

            var content = result.Content.ReadAsAsync<PlaceDto>();
            Assert.NotNull(content.Result);
        }
    }
}