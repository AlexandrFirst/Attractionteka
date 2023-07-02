import React from 'react';
import JolPlayer from "jol-player";
import {IMediaResponse} from "../../../models/admin/IMediaResponse";

import styles from './videoItem.module.scss';
import {IMediaFileDTO} from "../../../models/admin/IMediaFileDTO";

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
        </div>
    );
};

export default VideoItem;