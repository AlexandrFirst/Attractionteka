using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Internal;
using HtmlAgilityPack;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers.Extensions.ExpressionExtension;
using MusicAppApi.Helpers.Extensions.Pagination;
using MusicAppApi.Helpers.Extensions.RatingExtension;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public class PlaceService : IPlaceService
    {
        private sealed class Tag
        {
            public static readonly Tag VideoTag = new Tag(@"//video/source | //video", "video");
            public static readonly Tag AudioTag = new Tag(@"//audio/source | //audio", "audio");
            public static readonly Tag ImageTag = new Tag(@"//img", "photo");


            private Tag(string value, string category)
            {
                Value = value;
                Category = category;
            }

            public string Value { get; private set; }
            public string Category { get; private set; }
        }


        private readonly IMapper mapper;
        private readonly ICloudinaryService cloudinaryService;
        private readonly MyDataContext dataContext;
        private readonly IUserContextService userContext;

        public PlaceService(IMapper mapper,
                            ICloudinaryService cloudinaryService,
                            MyDataContext dataContext,
                            IUserContextService userContext)
        {
            this.mapper = mapper;
            this.cloudinaryService = cloudinaryService;
            this.dataContext = dataContext;
            this.userContext = userContext;
        }

        public async Task<PlaceDto> CreateNewPlace(PlaceDto newPlaceDto)
        {
            if (newPlaceDto.ListKeyWords == null)
                newPlaceDto.ListKeyWords = new List<string>();

            var filteredPlaceDto = await filterPlaceDescriptionMediaContent(newPlaceDto);


            HashSet<VideoFile> VideoFiles = await GetMedia(dataContext.VideoFiles, filteredPlaceDto.Videos);

            HashSet<AudioFile> AudioFiles = await GetMedia(dataContext.AudioFiles, filteredPlaceDto.Audios);
            HashSet<PhotoFile> PhotoFiles = await GetMedia(dataContext.PhotoFiles, filteredPlaceDto.Photos);

            var authorId = userContext.GetUserContext().Id;

            var authorEntity = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == authorId);


            var placeForInsertion = new PlaceDescription()
            {
                Content = newPlaceDto.Content,
                Name = newPlaceDto.Name,
                KeyWords = string.Join(",", newPlaceDto.ListKeyWords) + ",",
                ShortDescription = newPlaceDto.ShortDescription,
                UploadTime = DateTime.Now,
                Audios = AudioFiles,
                Videos = VideoFiles,
                Photos = PhotoFiles,
                Author = authorEntity
            };



            await dataContext.PlaceDescriptions.AddAsync(placeForInsertion);
            await dataContext.SaveChangesAsync();


            return mapper.Map<PlaceDto>(placeForInsertion);
        }

        public async Task<HashSet<TEntity>> GetMedia<TEntity, TEntityDto>(IQueryable<TEntity> placeToSerach,
                                                                          HashSet<TEntityDto> filteredMedia)
                                            where TEntity : MediaFile
                                            where TEntityDto : MediaFileDto
        {
            HashSet<TEntity> mediaFiles = (await placeToSerach.ToListAsync())
                                            .Where(v => filteredMedia.Any(m_v => m_v.Id == v.Id))
                                            .ToHashSet();
            return mediaFiles;
        }


        public async Task DeletePlace(int placeId)
        {
            var deletingPlaceDescription = await dataContext.PlaceDescriptions.FirstOrDefaultAsync(p => p.Id == placeId);

            if (deletingPlaceDescription is null)
                throw new System.Exception("No proper place found");

            dataContext.PlaceDescriptions.Remove(deletingPlaceDescription);
            await dataContext.SaveChangesAsync();

        }

        public async Task<PlaceDto> UpdatePlace(PlaceDto updatedPlaceDto)
        {
            var oldPlace = await dataContext.PlaceDescriptions.FirstOrDefaultAsync(p => p.Id == updatedPlaceDto.Id);

            if (oldPlace is null)
                throw new System.Exception("No proper place found");

            var oldPlaceDto = mapper.Map<PlaceDto>(oldPlace);

            oldPlaceDto.Audios.UnionWith(updatedPlaceDto.Audios);
            oldPlaceDto.Videos.UnionWith(updatedPlaceDto.Videos);
            oldPlaceDto.Photos.UnionWith(updatedPlaceDto.Photos);

            oldPlaceDto.Content = updatedPlaceDto.Content;

            oldPlaceDto.ListKeyWords = updatedPlaceDto.ListKeyWords;
            oldPlaceDto.ShortDescription = updatedPlaceDto.ShortDescription;
            oldPlaceDto.Name = updatedPlaceDto.Name;

            var filteredOldPlaceDto = await filterPlaceDescriptionMediaContent(oldPlaceDto);

            mapper.Map(filteredOldPlaceDto, oldPlace);
            await dataContext.SaveChangesAsync();
            return mapper.Map<PlaceDto>(oldPlace);
        }

        public async Task<PlaceDto> UpdatePlaceRating(RatingInputDto ratingInput, int userId)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var place = await dataContext.PlaceDescriptions.FirstOrDefaultAsync(p => p.Id == ratingInput.PlaceId);

            if (user == null || user.IsBanned || place == null)
            {
                throw new Exception("Can't excute operation");
            }

            var rating = await dataContext.Ratings.Include(u => u.User)
                                                .Include(p => p.Place)
                                                .FirstOrDefaultAsync(r => r.User.Id == userId && r.Place.Id == ratingInput.PlaceId);
            
            await AddHistotyRecord(user, place);

            if (rating != null)
            {
                rating.Rating = ratingInput.Rating;
                dataContext.Update(rating);
            }
            else
            {
                await dataContext.Ratings.AddAsync(new UserPlaceRating()
                {
                    Place = place,
                    User = user,
                    Rating = ratingInput.Rating
                });
            }

            await dataContext.SaveChangesAsync();
            return await GetPlaceById(ratingInput.PlaceId);
        }

        private async Task AddHistotyRecord(User user, PlaceDescription place)
        {
            var currentPlaceUserVisitHistory = (await dataContext.UsersHistory
                .Include(u => u.User)
                .Include(p => p.VisitedPlace).ToListAsync())
                .Where(h =>
                    (DateTime.Now - h.VisitTime).Minutes > 10 &&
                    h.User.Id == user.Id &&
                    h.VisitedPlace.Id == place.Id).ToList();

            if (currentPlaceUserVisitHistory.Count == 0)
            {
                var visitPlaceRecord = new UserVisitHistory()
                {
                    User = user,
                    VisitedPlace = place,
                    VisitTime = DateTime.Now
                };
                await dataContext.UsersHistory.AddAsync(visitPlaceRecord);
            }

            await dataContext.SaveChangesAsync();
        }

        public async Task<PlaceDto> GetPlaceById(int placeId, bool b = false)
        {
            var place = await dataContext.PlaceDescriptions.Include(p => p.Photos)
                                                            .Include(a => a.Audios)
                                                            .Include(v => v.Videos)
                                                            .Include(r => r.Ratings)
                                                            .FirstOrDefaultAsync(p => p.Id == placeId);
            if (place == null)
                throw new System.Exception("No proper place found");

            if (b)
            {
                place.ViewNumber++;
                dataContext.Update(place);
                await dataContext.SaveChangesAsync();
            }

            var readOnlyPlace = mapper.Map<PlaceDto>(place);
            readOnlyPlace.AverageRating = await place.CalculatePlaceRating();
            return readOnlyPlace;
        }

        private async Task<PlaceDto> filterPlaceDescriptionMediaContent(PlaceDto newPlaceDto)
        {
            var filteredPlaceDescription = newPlaceDto;
            filteredPlaceDescription.Photos = await filterMediaFileList(filteredPlaceDescription.Content,
                                                                filteredPlaceDescription.Photos,
                                                                Tag.ImageTag);

            filteredPlaceDescription.ListKeyWords = filteredPlaceDescription.ListKeyWords.Distinct().ToList();

            return filteredPlaceDescription;
        }

        private async Task<HashSet<MediaFileDto>> filterMediaFileList(string Content, HashSet<MediaFileDto> uploadedFiles, Tag tag)
        {
            HashSet<MediaFileDto> filesToDelete = new HashSet<MediaFileDto>();


            filesToDelete = scanForDeletionInputMediaSrc(Content, uploadedFiles, tag.Value);


            foreach (var file in filesToDelete)
            {
                await cloudinaryService.DeleteFile(file.PublicId, tag.Category);
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

        public async Task<PagedList<PlaceDescription>> GetPlacesByFilter(PlaceFilterDto filtersList)
        {
            var placeToReturn = new List<PlaceDescription>();

            var places = dataContext.PlaceDescriptions.Include(p => p.Photos)
                                                       .Include(a => a.Audios)
                                                       .Include(v => v.Videos)
                                                       .Include(au => au.Author)
                                                       .Include(r => r.Ratings);
            placeToReturn = await places.ToListAsync();

            if (filtersList.SortByRating)
            {
                var filteredPLacesByRating = placeToReturn.OrderBy(p =>
                {
                    var allRatings = p.Ratings;
                    if (allRatings.Count == 0)
                        return 0;
                    return allRatings.Select(r => r.Rating).Average();
                });
                placeToReturn = filteredPLacesByRating.ToList();
            }

            if (filtersList.SortByDateTime)
            {
                var filteredPLacesByTime = placeToReturn.OrderBy(p =>
                {
                    return p.UploadTime;
                });
                placeToReturn = filteredPLacesByTime.ToList();
            }


            var pagedParams = filtersList as PageParams;

            var filteredList = PagedList<PlaceDescription>.Create(placeToReturn, pagedParams.PageNumber, pagedParams.PageSize);

            if (filtersList.SortByPopularity)
            {
                if (filtersList.IsDescending)
                {

                    filteredList = (PagedList<PlaceDescription>)filteredList.OrderByDescending(async u => await u.CalculatePlaceRating());
                }
                else
                {
                    filteredList = (PagedList<PlaceDescription>)filteredList.OrderBy(async u => await u.CalculatePlaceRating());
                }
            }
            return filteredList;
        }
    }
}