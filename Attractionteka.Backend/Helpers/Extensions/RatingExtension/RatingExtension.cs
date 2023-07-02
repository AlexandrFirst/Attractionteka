using System.Linq;
using System.Threading.Tasks;
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

        public async static Task<double> CalculatePlaceRating(this PlaceDescription place)
        {
            var allPlaceMarks = await dataContext.Ratings.Include(p => p.Place).Where(r => r.Place.Id == place.Id).ToListAsync();
            if(allPlaceMarks.Count > 0)
                return allPlaceMarks.Average(p => p.Rating);
            return 0;
        }
    }
}