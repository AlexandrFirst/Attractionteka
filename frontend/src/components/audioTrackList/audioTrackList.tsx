import React from 'react';
import AudioTrackItem from "./audioTrackItem/audioTrackItem";

import styles from './audioTrackList.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Spinner from "../spinner/spinner";
import {IMediaResponse} from "../../models/admin/IMediaResponse";

export interface AudioTrackListProps {
    fileList: FileList | null;
    initialAudio?: IMediaResponse[];
}

const AudioTrackList:React.FC<AudioTrackListProps> = ({fileList, initialAudio}) => {

    const {audios: {data: audios, isLoading, error }} = useTypedSelector(state => state.editor);
    const {uploadAudio, setAudio} = useActions();

    const [state, setState] = React.useState<React.ReactNode>();

    React.useEffect(() => {
        setInitialAudios();
    }, [])

    React.useEffect(() => {
        requestToServer();
    }, [fileList])

    React.useEffect(() => {

        setState(setItemsToRender());
    }, [audios, isLoading, error])

    const setInitialAudios = () => {
        if(initialAudio) {
            for (let i = 0; i < initialAudio.length; ++i) {
                setAudio(initialAudio[i]);
            }
        }
    }

    const requestToServer = async () => {
        // console.log("fileList......", fileList);
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
            return audios.map((audio, index) => <AudioTrackItem audio={audio} num={index+1} key={audio.publicId}/>);
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