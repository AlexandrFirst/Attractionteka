import React, {FC, useEffect} from 'react';
import './AudioAttraction.css'
import iconinaudio from './img/iconaudio.png';
import download from './img/download.svg';
import play from './img/play.svg';
import pause from './img/pause.svg';
import {IMediaResponse} from "../../../models/admin/IMediaResponse";
import Player from "../../../components/player/Player";
import {useAudio} from "../../../hooks/useAudio";

export interface AudioAttractionProps {
    audios: IMediaResponse[]
    setCurrentAudio: Function
    currentAudio: string
}

const AudioAttraction:FC<AudioAttractionProps> = ({ audios, setCurrentAudio, currentAudio }) => {
    useEffect(() => {
        console.log("CURRENT_AUDIO", currentAudio)
    }, [currentAudio])

    return (
        <div className="block-audio">
            <div className="audio-header">
                <img src={iconinaudio} alt="" className="icon-information-header" />
                <div className="text-information-header">Audio</div>
            </div>
            <div className="audio-main">
                <ul className="audio-main-header">
                    <li className="li-number">#</li>
                    <li className="li-name-audio">NAME AUDIO</li>
                    <li className="li-date-added">DATE ADDED</li>
                    <li className="li-time">TIME</li>
                </ul>
                <hr className="line"/>
                <div className="list-audio">
                    {audios.map((audio,index) =>
                        <div key={audio.id} className="audio-item">
                            <span>{index+1}</span>
                            <span>Информация {index + 1}</span>
                            <span>{audio.duration?.substr(0, 10)}</span>
                            <span>03:22</span>
                            <Player url={audio.url} />
                        </div>)}
                </div>
            </div>
        </div>
    );
};


export default AudioAttraction;