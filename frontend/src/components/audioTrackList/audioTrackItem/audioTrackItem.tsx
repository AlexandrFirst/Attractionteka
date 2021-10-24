import React from 'react';
import {IMediaResponse} from "../../../models/IMediaResponse";

import styles from './audioTrackItem.module.scss';

export interface AudioTrackItemProps {
    audio: IMediaResponse;
    num: number;
}

const AudioTrackItem:React.FC<AudioTrackItemProps> = ({audio, num}) => {
    const getDuration = (duration: string) => {
        duration = duration.replace(',', '.');
        // console.log("duration",duration);
        const secs = Number(duration);
        // console.log("secs",secs);
        const h = Math.floor(secs / 3600);
        const m = Math.floor(secs % 3600 / 60);
        const s = Math.floor(secs % 3600 % 60);

        // console.log("h", h);
        // console.log("m", m);
        // console.log("s", s);

        const hDisplay = h > 0 ? (h < 10 ? "0" : "") + `${h}:`  : "";

        const mDisplay = m > 0 ? (m < 10 ? "0" : "") + `${m}:` : "";
        const sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "";
        // console.log("hDisplay + mDisplay + sDisplay=", hDisplay + mDisplay + sDisplay);
        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <div className={styles.wrapper}>
            <h5>{num}</h5>
            <h5>{audio.name}</h5>
            <h5>{getDuration(audio.duration)}</h5>
        </div>
    );
};

export default AudioTrackItem;