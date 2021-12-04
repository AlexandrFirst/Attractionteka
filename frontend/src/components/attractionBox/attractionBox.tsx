import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom';
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
import './attractionBox.scss';
import {IPlaceResponse} from "../../models/place/IPlaceResponse";
import Footer from "../footer/footer";
import {ReactJkMusicPlayerInstance} from "react-jinke-music-player";
import QrCode from 'react-qr-code';
import { FaHeart } from "react-icons/fa";
import cn from "classnames";
import TotalRatingHeaderAttraction
    from "../../sections/attraction/totalRatingHeaderAttraction/TotalRatingHeaderAttraction";
import {useActions} from "../../hooks/useActions";
import * as util from "../../util";
import {CommentDTO} from "../../models/comment/CommentDTO";

export interface AttractionBoxProps {
    placeData: IPlaceResponse;
    comments: CommentDTO[];
    mark: number;
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
    {placeData:{
        shortDescription,
        content,
        name,
        uploadTime,
        listKeyWords,
        photos,
        videos,
        audios,
        viewNumber,
        ratings
    },
        mark,
        comments
    }) => {

    const [currentAudio, setCurrentAudio] = useState(-1);
    const [currentAudioPlayerInstance, setCurrentAudioPlayerInstance] = useState<ReactJkMusicPlayerInstance | null>();
    const [visibleQrCode, setVisibleQrCode] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [isLeaveComment, setIsLeaveComment] = useState(false)

    const {setRatingToDatabase} = useActions();
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(ratings) {
            setAverageRating(util.calcAverage(ratings));
        }
    }, [ratings])


    return (
        <div>
            <div className="body-attraction">
                <Link to={RouteNames.MAIN} className="block-back-home">
                    <img src={iconhome} alt="iconhome" className="icon-home" />
                    <div className="text-home">Home - Attractions</div>
                </Link>
                <div onClick={() =>  setVisibleQrCode(prevState => !prevState)} className="qr-open">open QR-CODE</div>
                <div className="rate-wrapper">
                    <GeneralRateAttraction mark={mark} placeId={parseInt(id)} setRating={setRatingToDatabase}/>
                    <TotalRatingHeaderAttraction totalMarks={ratings?.length} viewNumber={viewNumber} averageRating={averageRating}/>
                </div>
                {name && <HeaderAttraction setVisibleQrCode={setVisibleQrCode} isVisibleQrCode={!visibleQrCode} name={name}/>}
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
                {ratings && <RatingAttraction
                    isLeaveComment={isLeaveComment}
                    setIsLeaveComment={setIsLeaveComment}
                    ratings={ratings}
                    averageRating={averageRating}/>}
                <ReviewsAttraction isLeaveComment={isLeaveComment} comments={comments} />
                <div className="block-author">{uploadTime}</div>
                <QrCode
                    className={cn("qr-code", { "qr-code_active": visibleQrCode} )}
                    value={window.location.href}
                    // size={1000}
                />
            </div>
            <Footer setCurrentAudioPlayerInstance={setCurrentAudioPlayerInstance} curAudio={currentAudio}/>
        </div>
    )
}

export default AttractionBox;