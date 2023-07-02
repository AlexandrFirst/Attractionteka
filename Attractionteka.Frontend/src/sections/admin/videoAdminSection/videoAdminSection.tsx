import React from 'react';
import MediaUploadSection from "../mediaUploadSection/mediaUploadSection";
import VideoGrid from "../../../components/videoGrid/videoGrid";
import {IMediaResponse} from "../../../models/admin/IMediaResponse";

export interface VideoAdminSectionProps {
    initialVideo?: IMediaResponse[];
}

const VideoAdminSection:React.FC<VideoAdminSectionProps> = ({initialVideo}) => {
    const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);

    return (
        <>
            <MediaUploadSection
                caption={"File upload for Video"}
                fileType={"video/*"}
                setFileList={setCurrentFileList}
                buttonCaption={"Select a file"}
            />
            <VideoGrid fileList={currentFileList} initialVideos={initialVideo}/>
        </>
    );
};

export default VideoAdminSection;