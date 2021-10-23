import React from 'react';
import AudioTrackItem from "./audioTrackItem/audioTrackItem";

import styles from './audioTrackList.module.scss';

export interface AudioTrackListProps {
    audios: File[] | null;
}

const AudioTrackList:React.FC<AudioTrackListProps> = ({audios}) => {

    const [itemsToRender, setItemsToRender] = React.useState<React.ReactNode>(null);

    React.useEffect(() => {
        console.log("Audios.......",audios);
        // console.log(audios)
        if(audios)
        if(audios?.length > 0) {
            setItemsToRender(audios.map(audio => {
                return (<AudioTrackItem audio={audio} key={audio.name}/>)
            }))
        } else {
            console.log("Else block")
            setItemsToRender(<h2>No file selected</h2>)
        }
    }, [audios])

    const renderItems = () => {

        console.log("Audios.......",audios);
        if(audios) {
            setItemsToRender(audios.map(audio => {
                return (<AudioTrackItem audio={audio} key={audio.name}/>)
            }))
        } else {
            setItemsToRender(<h1>No file selected</h1>)
        }
    }

    return (
        <div className={styles.wrapper}>
            {itemsToRender}
        </div>
    );
};

export default AudioTrackList;