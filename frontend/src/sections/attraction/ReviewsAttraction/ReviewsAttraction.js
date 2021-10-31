import React from 'react';
import './ReviewsAttraction.css'
import iconreviews from './img/iconreviews.png';

const ReviewsAttraction = () => {
    return (
        <div className="block-reviews">
            <div className="audio-header">
                <img src={iconreviews} alt="" className="icon-information-header" />
                <div className="text-information-header">Reviews</div>
            </div>
            <div className="list-reviews"></div>
        </div>
    );
};


export default ReviewsAttraction;