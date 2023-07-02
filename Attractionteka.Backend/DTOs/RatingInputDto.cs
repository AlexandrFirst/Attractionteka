using System;
using System.Collections.Generic;

namespace MusicAppApi.DTOs
{
    public class RatingInputDto
    {
        public int PlaceId { get; set; }

        private double m_rating = 0;
        public double Rating
        {
            get
            {
                return m_rating;
            }
            set
            {
                if (value > 5)
                    m_rating = 5;
                else if (value < 0)
                    m_rating = 0;
                else
                    m_rating = value;
            }
        }
    }
}