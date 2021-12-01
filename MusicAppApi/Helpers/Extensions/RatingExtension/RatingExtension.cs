using Microsoft.EntityFrameworkCore;
using MusicAppApi.Models;

namespace MusicAppApi.Helpers.Extensions.RatingExtension
{
    public static class RatingExtension
    {
        private static MyDataContext dataContext;
        public static void Configure(MyDataContext m_dataContext)
        {
            dataContext = m_dataContext;
        }

        public static double CalculatePlaceRating(this PlaceDescription place)
        {
            return 0;
        }
    }
}