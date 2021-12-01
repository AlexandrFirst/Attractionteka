import React from 'react';
import './PhotoAttraction.css'
import iconphoto from './img/iconphoto.png';
import Carousel from 'react-elastic-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
const PhotoAttraction = (props) => {
    const renderPhotos = props.photos.map(photo => <img className="item-photo" key={photo.url} src={photo.url}/>);

    return (
        <div className="block-photo">
            <div className="audio-header">
                <img src={iconphoto} alt="" className="icon-information-header" />
                <div className="text-information-header">Photo</div>
                </div>
                
            <div className="list-photo">
                <Carousel breakPoints={breakPoints}>
                    {renderPhotos}
                </Carousel>
            </div>
        </div>
    );
};


export default PhotoAttraction;