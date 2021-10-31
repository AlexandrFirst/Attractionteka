import React from 'react';
import './RatingAttraction.css'
import iconrating from './img/iconrating.png';

const RatingAttraction = () => {
    return (
        <div className="block-rating">
            <div className="audio-header">
                <img src={iconrating} alt="" className="icon-information-header" />
                <div className="text-information-header">Rating</div>
            </div>
            <div className="rating"></div>
        </div>
    );
};

export default RatingAttraction;