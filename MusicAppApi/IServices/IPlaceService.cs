using System.Collections.Generic;
using System.Threading.Tasks;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers.Extensions.Pagination;
using MusicAppApi.Models;

namespace MusicAppApi.IServices
{
    public interface IPlaceService
    {
        Task<PlaceDto> CreateNewPlace(PlaceDto newPlaceDto);
        Task DeletePlace(int placeId);
        Task<PlaceDto> GetPlaceById(int placeId, bool b = false);
        Task<PlaceDto> UpdatePlace(PlaceDto updatedPlaceDto);
        Task<List<PlaceDescription>> GetPlacesByFilter(PlaceFilterDto filtersList);
        Task<PlaceDto> UpdatePlaceRating(RatingInputDto ratingInput, int userId);
    }
}