import React from 'react';
import './AudioAttraction.css'
import iconinaudio from './img/iconaudio.png';
import download from './img/download.svg';
import play from './img/play.svg';
import pause from './img/pause.svg';

const AudioAttraction = (props) => {
    const renderItems = props.audios.map((audio,index) =>
        <div className="audio-item">
            <span>{index+1}</span>
            <span>Информация </span>
            <span>{audio.uploadTime.substr(0, 10)}</span>
            <span>03:22</span>
            <div className="play_download_wrapper">
                {props.currentAudio !== index ?
                    <img onClick={() => {
                        props.setCurrentAudio(index)
                        // if(props.currentAudio === index){
                        //     props.currentAudioPlayerInstance.pause();
                        // }
                    }} className="btn" src={play} alt="play"/>
                    :
                    <img onClick={() => {
                        props.setCurrentAudio(-1000);
                    }}
                         className="btn" src={pause} alt="pause"/>
                }
                <img className="btn" src={download} alt="download"/>
            </div>
        </div>)

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
                    {renderItems}
                </div>
            </div>
        </div>
    );
};


export default AudioAttraction;