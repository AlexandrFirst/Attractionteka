import React from 'react';
import './PhotoAttraction.css'
import iconphoto from './img/iconphoto.png';

const PhotoAttraction = (props) => {
    const renderPhotos = props.photos.map(photo => <img className="item-photo" key={photo.url} src={photo.url}/>)

    return (
        <div className="block-photo">
            <div className="audio-header">
                <img src={iconphoto} alt="" className="icon-information-header" />
                <div className="text-information-header">Photo</div>
                </div>
            <div className="list-photo">{renderPhotos}</div>
        </div>
    );
};


export default PhotoAttraction;