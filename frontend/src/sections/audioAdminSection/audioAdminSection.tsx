import React from 'react';

import MediaUploadSection from "../../components/mediaUploadSection/mediaUploadSection";
import AudioTrackList from "../../components/audioTrackList/audioTrackList";

const AudioAdminSection = () => { //TODO: Use React.useMemo to this component
    const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);
    let audios: File[] = [];

    React.useEffect(() => {
        if(currentFileList) {
            for (let i = 0; i < currentFileList.length; ++i) {
                audios.push(currentFileList[i]);
            }
        }
    }, [currentFileList, audios])

    return (
        <>
            <MediaUploadSection
                caption={"File upload for Audio"}
                fileType={"audio/*"}
                setFile={setCurrentFileList}
                buttonCaption={"Select a file"}
            />
            <AudioTrackList audios={audios}/>
        </>
    );
};

export default AudioAdminSection;