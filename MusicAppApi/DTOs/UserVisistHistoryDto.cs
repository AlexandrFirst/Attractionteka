using System;

namespace MusicAppApi.DTOs
{
    public class UserVisistHistoryDto
    {
        public PlaceReadOnlyDto VisitedPlace { get; set; }
        public DateTime VisitTime { get; set; }
    }
}