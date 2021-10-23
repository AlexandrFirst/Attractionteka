import React from 'react';

export interface AudioTrackItemProps {
    audio: File;
}

const AudioTrackItem:React.FC<AudioTrackItemProps> = ({audio}) => {
    return (
        <div>
            <h1>AAAAAA</h1>
        </div>
    );
};

export default AudioTrackItem;