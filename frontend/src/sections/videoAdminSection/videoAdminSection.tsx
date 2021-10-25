import React from 'react';
import MediaUploadSection from "../../components/mediaUploadSection/mediaUploadSection";
import VideoGrid from "../../components/videoGrid/videoGrid";

const VideoAdminSection = () => {
    const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);

    return (
        <>
            <MediaUploadSection
                caption={"File upload for Video"}
                fileType={"video/*"}
                setFile={setCurrentFileList}
                buttonCaption={"Select a file"}
            />
            <VideoGrid fileList={currentFileList} />
        </>
    );
};

export default VideoAdminSection;