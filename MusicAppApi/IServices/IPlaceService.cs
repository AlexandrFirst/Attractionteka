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
         Task<PlaceDto> GetPlaceById (int placeId);
         Task<PlaceDto> UpdatePlace(PlaceDto updatedPlaceDto);
         Task<PagedList<PlaceDescription>> GetPlacesByFilter(PlaceFilterDtos filtersList);
    }
}