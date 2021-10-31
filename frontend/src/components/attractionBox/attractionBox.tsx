import React from 'react'
import {Link} from 'react-router-dom';
import iconhome from './img/iconhome.png';
import InformationAttraction from '../../sections/attraction/InformationAttraction/InformationAttraction'
import AudioAttraction from '../../sections/attraction/AudioAttraction/AudioAttraction.js'
import PhotoAttraction from '../../sections/attraction/PhotoAttraction/PhotoAttraction.js';
import VideoAttraction from '../../sections/attraction/VideoAttraction/VideoAttraction.js';
import RatingAttraction from '../../sections/attraction/RatingAttraction/RatingAttraction.js';
import ReviewsAttraction from '../../sections/attraction/ReviewsAttraction/ReviewsAttraction.js';
import KeyWordsAttraction from '../../sections/attraction/KeyWordsAttraction/KeyWordsAttraction.js';
import MainPhotoAttracrtion from '../../sections/attraction/MainPhotoAttraction/MainPhotoAttraction.js';
import HeaderAttraction from '../../sections/attraction/HeaderAttraction/HeaderAttraction.js';
import GeneralRateAttraction from '../../sections/attraction/GeneralRateAttraction/GeneralRateAttraction.js';
import {RouteNames} from "../../routes";
import './attractionBox.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {IPlaceResponse} from "../../models/place/IPlaceResponse";
import {mockPhotos, mockVideos} from "../../MOCKDATA/ATTRACTION_DATA";

export interface AttractionBoxProps {
    data: IPlaceResponse;
}

const AttractionBox:React.FC<AttractionBoxProps> = (
    {data:{
        shortDescription,
        content,
        name,
        uploadTime,
        listKeyWords,
        photos,
        videos,
        audios
    }}) => {

    console.log(videos);

    return (
        <div>
            <div className="body-attraction">
                <Link to={RouteNames.MAIN} className="block-back-home">
                    <img src={iconhome} alt="" className="icon-home" />
                    <div className="text-home">Home - Attractions</div>
                </Link>
                <GeneralRateAttraction />
                <HeaderAttraction name={name} />
                <MainPhotoAttracrtion  />
                <InformationAttraction content={content}/>
                <KeyWordsAttraction keywords={listKeyWords?.$values}/>
                {audios && <AudioAttraction audios={audios}/>}
                {photos && <PhotoAttraction photos={photos}/>}
                {videos && <VideoAttraction videos={videos}/>}
                <RatingAttraction />
                <ReviewsAttraction />
                <div className="block-author">{uploadTime}-"author"</div>
            </div>
        </div>
    )
}

export default AttractionBox;