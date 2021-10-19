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
            //TODO: get author from context
            var createdPlace = await placeService.CreateNewPlace(newPlaceDto);
            return Ok(createdPlace);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            await placeService.DeletePlace(id);
            return Ok(new
            {
                Response = "Place is deleted successfully"
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadPlace(int id)
        {
            var response = await placeService.GetPlaceById(id);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlace([FromBody] PlaceDto updatePlaceDto)
        {
            var response = await placeService.UpdatePlace(updatePlaceDto);
            return Ok(response);
        }
    }
}