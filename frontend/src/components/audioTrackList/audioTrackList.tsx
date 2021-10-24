import React from 'react';
import AudioTrackItem from "./audioTrackItem/audioTrackItem";

import styles from './audioTrackList.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Spinner from "../spinner/spinner";

export interface AudioTrackListProps {
    fileList: FileList | null;
}

const AudioTrackList:React.FC<AudioTrackListProps> = ({fileList}) => {

    const {audios: {data: audios, isLoading, error }} = useTypedSelector(state => state.editor);
    const {uploadAudio} = useActions();

    const [state, setState] = React.useState<React.ReactNode>();

    React.useEffect(() => {
        console.log("USE EFFECT -> fileArray");
        requestToServer();
    }, [fileList])

    React.useEffect(() => {
        console.log("USE EFFECT -> audios");
        console.log("audios use effect", audios);
        setState(setItemsToRender());
    }, [audios, isLoading, error])

    const requestToServer = async () => {
        console.log("fileArray......", fileList);
        if(fileList?.length) {
            for (let i = 0; i < fileList.length; ++i) {
                const data = new FormData();
                data.append("media", fileList[i]);
                await uploadAudio(data);
            }
            // for (const file of fileArray) {
            //     const data = new FormData();
            //     data.append("media", file);
            //     await uploadMedia(data, "audio");
            // }
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

            // return audios.map((audio, index) => {
            //     if(audio.name != fileList)
            // })
        } else {
            return <h2 className={styles.no_files}>No file selected</h2>
        }
    }


    return (
        <div className={styles.wrapper}>
            {state}
        </div>
    );
};

export default AudioTrackList;