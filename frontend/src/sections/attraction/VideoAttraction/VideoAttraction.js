import React from 'react';
import './VideoAttraction.css'
import iconvideo from './img/iconvideo.png';
import JolPlayer from "jol-player";

const VideoAttraction = (props) => {

    const renderItem = props.videos?.map(video => <JolPlayer className="item-video"
        option={{
            videoSrc: video.url,
            width: 500,
            height: 250,
            language: "en"
        }}
    />)

    return (
        <div className="block-video">
            <div className="audio-header">
                <img src={iconvideo} alt="" className="icon-information-header" />
                <div className="text-information-header">Video</div>
                </div>
            <div className="list-video">{renderItem}</div>
        </div>
    );
};


export default VideoAttraction;