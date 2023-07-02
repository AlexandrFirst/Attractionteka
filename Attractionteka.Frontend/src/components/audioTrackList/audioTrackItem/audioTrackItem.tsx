import React from 'react';
import {IMediaResponse} from "../../../models/admin/IMediaResponse";

import styles from './audioTrackItem.module.scss';
import {useActions} from "../../../hooks/useActions";

import {trashBin} from './audioTrackItemData';
import {createWriteStream} from "fs";

export interface AudioTrackItemProps {
    audio: IMediaResponse;
    num: number;
}

const AudioTrackItem:React.FC<AudioTrackItemProps> = ({audio, num}) => {
    const { deleteAudio } = useActions();

    const getDurationMock = () => {
        const h = 0;
        const m = Math.floor(Math.random() * 20);
        const s = Math.floor(Math.random() * 60 + 1);

        const hDisplay = h > 0 ? (h < 10 ? "0" : "") + `${h}:`  : "";
        const mDisplay = m > 0 ? (m < 10 ? "0" : "") + `${m}:` : "00:";
        const sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "";

        return hDisplay + mDisplay + sDisplay;
    }

    const getDuration = (duration: string) => {
        // console.log("duration", duration);
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

        // const hDisplay = h > 0 ? (h < 10 ? "0" : "") + `${h}h:`  : "";
        // const mDisplay = m > 0 ? (m < 10 ? "0" : "") + `${m}m:` : "";
        // const sDisplay = s > 0 ? (s < 10 ? "0" : "") + `${s}s` : "";

        const hDisplay = h > 0 ? `${h}:`  : "";
        const mDisplay = m > 0 ? `${m}:` : "00:";
        const sDisplay = s > 0 ? s : "";
        // console.log("hDisplay + mDisplay + sDisplay=", hDisplay + mDisplay + sDisplay);

        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <div className={styles.wrapper}>
            <h5>{num}</h5>
            <h5>{`Информация ${num}`}</h5>
            {/*<h5>{getDurationMock()}</h5>*/}
            {/*<h5>{"DURATION"}</h5>*/}
            <div
                className={styles.delete_item}
                onClick={() => deleteAudio(audio)}
            >{trashBin}</div>
        </div>
    );
};

export default AudioTrackItem;