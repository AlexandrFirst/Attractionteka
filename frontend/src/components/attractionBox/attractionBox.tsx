import React from 'react'
import {Link} from 'react-router-dom';
import iconhome from './img/iconhome.png';
import InformationAttraction from '../../sections/attraction/InformationAttraction/InformationAttraction'
import AudioAttraction from '../../sections/attraction/AudioAttraction/AudioAttraction'
import PhotoAttraction from '../../sections/attraction/PhotoAttraction/PhotoAttraction';
import VideoAttraction from '../../sections/attraction/VideoAttraction/VideoAttraction';
import RatingAttraction from '../../sections/attraction/RatingAttraction/RatingAttraction';
import ReviewsAttraction from '../../sections/attraction/ReviewsAttraction/ReviewsAttraction';
import KeyWordsAttraction from '../../sections/attraction/KeyWordsAttraction/KeyWordsAttraction';
import MainPhotoAttracrtion from '../../sections/attraction/MainPhotoAttraction/MainPhotoAttraction';
import HeaderAttraction from '../../sections/attraction/HeaderAttraction/HeaderAttraction';
import GeneralRateAttraction from '../../sections/attraction/GeneralRateAttraction/GeneralRateAttraction';
import {RouteNames} from "../../routes";
import './attractionBox.css';
import {IPlaceResponse} from "../../models/place/IPlaceResponse";
import Footer from "../footer/footer";
import {ReactJkMusicPlayerInstance} from "react-jinke-music-player";

export interface AttractionBoxProps {
    data: IPlaceResponse;
}

interface AudioListProps {
    name: string | React.ReactNode;
    musicSrc: string;
    cover: string;
    singer?: string | React.ReactNode;
    duration?: number;
    lyric?: string;
    [key: string]: any
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

    const [currentAudio, setCurrentAudio] = React.useState(-1);
    const [currentAudioPlayerInstance, setCurrentAudioPlayerInstance] = React.useState<ReactJkMusicPlayerInstance | null>();

    return (
        <div>
            <div className="body-attraction">
                <Link to={RouteNames.MAIN} className="block-back-home">
                    <img src={iconhome} alt="" className="icon-home" />
                    <div className="text-home">Home - Attractions</div>
                </Link>
                <GeneralRateAttraction />
                {name && <HeaderAttraction name={name}/>}
                {photos?.length > 0 && <MainPhotoAttracrtion photo={photos[0].url}/>}
                <InformationAttraction content={content}/>
                <KeyWordsAttraction keywords={listKeyWords}/>
                {audios && <AudioAttraction
                    currentAudio={currentAudio}
                    setCurrentAudio={setCurrentAudio}
                    audios={audios}
                    currentAudioPlayerInstance={currentAudioPlayerInstance}
                />}
                {photos && <PhotoAttraction photos={photos}/>}
                {videos && <VideoAttraction videos={videos}/>}
                <RatingAttraction />
                <ReviewsAttraction />
                <div className="block-author">{uploadTime}-"author"</div>
            </div>
            <Footer setCurrentAudioPlayerInstance={setCurrentAudioPlayerInstance} curAudio={currentAudio}/>
        </div>
    )
}

export default AttractionBox;