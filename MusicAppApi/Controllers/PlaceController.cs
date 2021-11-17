using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers;
using MusicAppApi.Helpers.Extensions.Pagination;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaceController : ControllerBase
    {
        private readonly IPlaceService placeService;
        private readonly IMapper mapper;

        public PlaceController(IPlaceService placeService,
                                IMapper mapper)
        {
            this.mapper = mapper;
            this.placeService = placeService;
        }

        [Authorize]
        [HttpPost("newplace")]
        public async Task<IActionResult> CreatePlace([FromBody] PlaceDto newPlaceDto)
        {
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

        [HttpGet("getPlaces")]
        public async Task<IActionResult> GetPlaces([FromQuery] PlaceFilterDto placeFilter)
        {
            var places = await placeService.GetPlacesByFilter(placeFilter);

            Response.AddPagination(places.CurrentPage, places.PageSize, places.TotalCount, places.TotalPages);

            var response = mapper.Map<List<PlaceDto>>(places as List<PlaceDescription>);

            return Ok(response);
        }
    }
}