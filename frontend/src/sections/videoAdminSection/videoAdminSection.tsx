import React from 'react';
import MediaUploadSection from "../../components/mediaUploadSection/mediaUploadSection";

const VideoAdminSection = () => {
    return (
        <MediaUploadSection
            caption={"File upload for Video"}
            fileType={"video/*"}
            setFile={() => {}}
            buttonCaption={"Select a file"}
        />
    );
};

export default VideoAdminSection;