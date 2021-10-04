using System.Threading.Tasks;
using MusicAppApi.DTOs;

namespace MusicAppApi.IServices
{
    public interface IPlaceService
    {
         Task<PlaceDto> CreateNewPlace(PlaceDto newPlaceDto);
    }
}