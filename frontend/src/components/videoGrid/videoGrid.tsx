import React from 'react';

import styles from './videoGrid.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Spinner from "../spinner/spinner";
import VideoItem from "./videoItem/videoItem";
import cn from "classnames";
import {IMediaResponse} from "../../models/admin/IMediaResponse";

export interface VideoGridProps {
    fileList: FileList | null;
    initialVideos?: IMediaResponse[];
}

const VideoGrid:React.FC<VideoGridProps> = ({fileList, initialVideos}) => {
    const {videos:  {data: videos, isLoading, error }} = useTypedSelector(state => state.editor);
    const {uploadVideo, deleteVideo, setVideo} = useActions();

    const [state, setState] = React.useState<React.ReactNode>();

    React.useEffect(() => {
        setInitialVideos();
    }, [])

    React.useEffect(() => {
        requestToServer();
    }, [fileList])

    React.useEffect(() => {
        setState(setItemsToRender());
    }, [videos, isLoading, error])

    const requestToServer = async () => {
        if(fileList?.length) {
            for (let i = 0; i < fileList.length; ++i) {
                const data = new FormData();
                data.append("media", fileList[i]);
                await uploadVideo(data);
            }
        }
    }

    const setInitialVideos = () => {
        if(initialVideos) {
            for (let i = 0; i < initialVideos.length; ++i) {
                setVideo(initialVideos[i]);
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