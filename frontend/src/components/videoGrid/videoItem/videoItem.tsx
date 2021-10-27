import React from 'react';
import JolPlayer from "jol-player";
import {IMediaResponse} from "../../../models/IMediaResponse";

import styles from './videoItem.module.scss';

export interface VideoItemProps {
    video: IMediaResponse;
    deleteFunc: Function;
}

const VideoItem: React.FC<VideoItemProps> = ({video, deleteFunc}) => {
    return (
        <div className={styles.wrapper}>
            <JolPlayer
                option={{
                    videoSrc: video.url,
                    width: 500,
                    height: 250,
                    language: "en"
                }}
            />
            <div
                className={styles.delete_btn}
                onClick={() => deleteFunc(video)}
            >X</div>
            {/*//TODO: add delete button*/}
        </div>
    );
};

export default VideoItem;