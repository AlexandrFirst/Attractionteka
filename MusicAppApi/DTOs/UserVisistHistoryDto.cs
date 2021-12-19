using System;

namespace MusicAppApi.DTOs
{
    public class UserVisistHistoryDto
    {
        public PlaceDto VisitedPlace { get; set; }
        public DateTime VisitTime { get; set; }
    }
}