import React from 'react';
import './AudioAttraction.css'
import iconinaudio from './img/iconaudio.png';

const AudioAttraction = (props) => {
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
                <hr className="line"></hr>
                <div className="list-audio">
                    ТУТ ДОЛЖЕН БЫТЬ СПИСОК МУЗЫКИ
                </div>
            </div>
        </div>
    );
};


export default AudioAttraction;