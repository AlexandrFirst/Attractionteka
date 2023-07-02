using System;
using System.Collections.Generic;
using MusicAppApi.Helpers.Extensions.Pagination;

namespace MusicAppApi.DTOs
{
    public class PlaceFilterDto: PageParams
    {
        public string PlaceName { get; set; }
        public List<string> KeyWords { get; set; }
        public List<string> AuthorNameList { get; set; }
        public DateTime FromTime { get; set; } = DateTime.MinValue;
        public DateTime ToTime { get; set; } = DateTime.MaxValue;
        public double FromRating { get; set; } = 0;
        public double ToRating { get; set; } = Double.MaxValue;
        public bool SortByPopularity { get; set; } = false;
        public bool SortByRating { get; set; } = false;
        public bool SortByDateTime { get; set; } = false;
        public bool IsDescending { get; set; } = false;

    }
}