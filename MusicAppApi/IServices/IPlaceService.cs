using System.Threading.Tasks;
using MusicAppApi.DTOs;

namespace MusicAppApi.IServices
{
    public interface IPlaceService
    {
         Task<PlaceDto> CreateNewPlace(PlaceDto newPlaceDto);
         Task DeletePlace(int placeId);
         Task<PlaceReadOnlyDto> GetPlaceById (int placeId);
         Task<PlaceDto> UpdatePlace(PlaceDto updatedPlaceDto);
    }
}