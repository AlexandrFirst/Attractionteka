import React from 'react';
import {IMediaResponse} from "../../../models/IMediaResponse";

import styles from './audioTrackItem.module.scss';

export interface AudioTrackItemProps {
    audio: IMediaResponse;
    num: number;
}

const AudioTrackItem:React.FC<AudioTrackItemProps> = ({audio, num}) => {
    return (
        <div className={styles.wrapper}>
            <h5>{num}</h5>
            <h5>{audio.name}</h5>

        </div>
    );
};

export default AudioTrackItem;