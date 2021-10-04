using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.DTOs;
using MusicAppApi.IServices;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaceController : ControllerBase
    {
        private readonly IPlaceService placeService;

        public PlaceController(IPlaceService placeService)
        {
            this.placeService = placeService;
        }

        [HttpPost("newplace")]
        public async Task<IActionResult> CreatePlace([FromBody] PlaceDto newPlaceDto)
        {
            var createdPlace = await placeService.CreateNewPlace(newPlaceDto);
            return Ok(createdPlace);
        }
    }
}