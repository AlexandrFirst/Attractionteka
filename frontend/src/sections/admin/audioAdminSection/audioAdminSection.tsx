import React from 'react';

import MediaUploadSection from "../mediaUploadSection/mediaUploadSection";
import AudioTrackList from "../../../components/audioTrackList/audioTrackList";

const AudioAdminSection = () => { //TODO: Use React.useMemo to this component
    const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);

    return (
        <>
            <MediaUploadSection
                caption={"File upload for Audio"}
                fileType={"audio/*"}
                setFile={setCurrentFileList}
                buttonCaption={"Select a file"}
            />
            <AudioTrackList fileList={currentFileList}/>
        </>
    );
};

export default AudioAdminSection;