import React from 'react';
import JolPlayer from "jol-player";
import {IMediaResponse} from "../../../models/IMediaResponse";

import styles from './videoItem.module.scss';

export interface VideoItemProps {
    video: IMediaResponse;
}

const VideoItem: React.FC<VideoItemProps> = ({video}) => {
    return (
        <>
            <div className={styles.rect}>
                <JolPlayer
                    option={{
                        videoSrc: video.url,
                        width: 500,
                        height: 250,
                        language: "en"
                    }}
                />
            </div>
            {/*//TODO: add delete button*/}
        </>
    );
};

export default VideoItem;