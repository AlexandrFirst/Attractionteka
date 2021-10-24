import React from 'react';
import {IMediaResponse} from "../../../models/IMediaResponse";

export interface AudioTrackItemProps {
    audio: File;
}

const AudioTrackItem:React.FC<AudioTrackItemProps> = ({audio}) => {
    return (
        <>
            <h2>{audio.name}</h2>
        </>
    );
};

export default AudioTrackItem;