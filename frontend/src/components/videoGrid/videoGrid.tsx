import React from 'react';

import styles from './videoGrid.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Spinner from "../spinner/spinner";
import VideoItem from "./videoItem/videoItem";
import cn from "classnames";

export interface VideoGridProps {
    fileList: FileList | null;
}

const VideoGrid:React.FC<VideoGridProps> = ({fileList}) => {
    const {videos:  {data: videos, isLoading, error }} = useTypedSelector(state => state.editor);
    const {uploadVideo, deleteVideo} = useActions();

    const [state, setState] = React.useState<React.ReactNode>();

    React.useEffect(() => {
        console.log("USE EFFECT -> fileList");
        requestToServer();
    }, [fileList])

    React.useEffect(() => {
        console.log("USE EFFECT -> videos");
        console.log("videos use effect", videos);
        setState(setItemsToRender());
    }, [videos, isLoading, error])

    const requestToServer = async () => {
        console.log("fileList......", fileList);
        if(fileList?.length) {
            for (let i = 0; i < fileList.length; ++i) {
                const data = new FormData();
                data.append("media", fileList[i]);
                await uploadVideo(data);
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
        if(videos.length > 0) {
            return videos.map((video) => <VideoItem deleteFunc={deleteVideo} video={video} key={video.publicId}/>);
        } else {
            return <h2 className={styles.no_files}>No file selected</h2>
        }
    }


    return (
        <div className={isLoading || error || !videos.length ? styles.loading_error : styles.wrapper}>
            {state}
        </div>
    );
};

export default VideoGrid;