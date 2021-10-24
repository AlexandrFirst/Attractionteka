import React from 'react';
import AudioTrackItem from "./audioTrackItem/audioTrackItem";

import styles from './audioTrackList.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Spinner from "../spinner/spinner";

export interface AudioTrackListProps {
    fileArray: File[] | null;
}

const AudioTrackList:React.FC<AudioTrackListProps> = ({fileArray}) => {

    const {audios, isLoading, error} = useTypedSelector(state => state.editor);
    const {uploadMedia} = useActions();

    const [state, setState] = React.useState<React.ReactNode>();

    React.useEffect(() => {
        console.log("USE EFFECT -> fileArray");
        requestToServer();
    }, [fileArray])

    React.useEffect(() => {
        console.log("USE EFFECT -> audios");
        console.log("audios use effect", audios);
        setState(setItemsToRender());
    }, [audios, isLoading, error])

    const requestToServer = async () => {
        console.log("fileArray......", fileArray);
        if(fileArray?.length) {
            for (const file of fileArray) {
                const data = new FormData();
                data.append("media", file);
                await uploadMedia(data, "audio");
            }
        }
    }

    const setItemsToRender = (): React.ReactNode => {
        if(isLoading) {
            return <Spinner/>
        }
        if(error) {
            return <h2>{error}</h2>
        }
        if(audios.length > 0) {
            return fileArray?.map(file => <AudioTrackItem audio={file} key={file.name}/>)
        } else {
            return <h2>No file selected</h2>
        }
    }


    return (
        <div className={styles.wrapper}>
            {state}
        </div>
    );
};

export default AudioTrackList;