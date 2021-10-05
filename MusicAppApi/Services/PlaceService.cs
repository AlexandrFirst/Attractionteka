using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HtmlAgilityPack;
using MusicAppApi.DTOs;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public class PlaceService : IPlaceService
    {
        private sealed class Tag
        {
            public static readonly Tag VideoTag = new Tag(@"//video/source[@src]");
            public static readonly Tag AudioTag = new Tag(@"//audio/source[@src]");
            public static readonly Tag ImageTag = new Tag(@"//img[@src]");


            private Tag(string value)
            {
                Value = value;
            }

            public string Value { get; private set; }
        }


        private readonly IMapper mapper;
        private readonly ICloudinaryService cloudinaryService;
        private readonly MyDataContext dataContext;

        public PlaceService(IMapper mapper,
                            ICloudinaryService cloudinaryService,
                            MyDataContext dataContext)
        {
            this.mapper = mapper;
            this.cloudinaryService = cloudinaryService;
            this.dataContext = dataContext;
        }

        public async Task<PlaceDto> CreateNewPlace(PlaceDto newPlaceDto)
        {
            var filteredPlaceDto = await filterPlaceDescriptionMediaContent(newPlaceDto);


            // var placeForInsertion = mapper.Map<PlaceDescription>(filteredPlaceDto);
            var placeForInsertion = new PlaceDescription()
            {
                Content = newPlaceDto.Content,
                Name = newPlaceDto.Name,
                KeyWords = string.Join(",", newPlaceDto.ListKeyWords),
                ShortDescription = newPlaceDto.ShortDescription,
            };

            await dataContext.PlaceDescriptions.AddAsync(placeForInsertion);
            await dataContext.SaveChangesAsync();

            placeForInsertion.Audios = mapper.Map<HashSet<AudioFile>>(filteredPlaceDto.Audios);
            placeForInsertion.Videos = mapper.Map<HashSet<VideoFile>>(filteredPlaceDto.Videos);
            placeForInsertion.Photos = mapper.Map<HashSet<PhotoFile>>(filteredPlaceDto.Photos);
            placeForInsertion.Author = mapper.Map<User>(newPlaceDto.Author);

            await dataContext.SaveChangesAsync();

            return mapper.Map<PlaceDto>(placeForInsertion);
        }


        private async Task<PlaceDto> filterPlaceDescriptionMediaContent(PlaceDto newPlaceDto)
        {
            var filteredPlaceDescription = newPlaceDto;
            filteredPlaceDescription.Photos = await filterMediaFileList(filteredPlaceDescription.Content,
                                                                filteredPlaceDescription.Photos,
                                                                Tag.ImageTag);

            filteredPlaceDescription.Videos = await filterMediaFileList(filteredPlaceDescription.Content,
                                                                filteredPlaceDescription.Videos,
                                                                Tag.VideoTag);

            filteredPlaceDescription.Audios = await filterMediaFileList(filteredPlaceDescription.Content,
                                                                filteredPlaceDescription.Audios,
                                                                Tag.AudioTag);

            return filteredPlaceDescription;
        }

        private async Task<HashSet<MediaFileDto>> filterMediaFileList(string Content, HashSet<MediaFileDto> uploadedFiles, Tag tag)
        {
            HashSet<MediaFileDto> filesToDelete = new HashSet<MediaFileDto>();


            filesToDelete = scanForDeletionInputMediaSrc(Content, uploadedFiles, tag.Value);


            foreach (var file in filesToDelete)
            {
                await cloudinaryService.DeleteFile(file.PublicId);
            }


            return uploadedFiles.Except(filesToDelete).ToHashSet();
        }

        private HashSet<MediaFileDto> scanForDeletionInputMediaSrc(string htmlContent, HashSet<MediaFileDto> LoadedImages, string XPath)
        {
            List<string> htmlContentImgs = new List<string>();

            HtmlDocument document = new HtmlDocument();
            document.LoadHtml(htmlContent);

            var nodes = document.DocumentNode.SelectNodes(XPath);
            if (nodes != null)
            {
                foreach (HtmlNode img in nodes)
                {
                    string imgSrc = img.GetAttributeValue("src", string.Empty);

                    if (!string.IsNullOrEmpty(imgSrc))
                    {
                        htmlContentImgs.Add(imgSrc);
                    }
                }
            }

            HashSet<MediaFileDto> urlsToDelete = LoadedImages.Where(img => !htmlContentImgs.Contains(img.Url)).ToHashSet();

            return urlsToDelete;

        }
    }
}