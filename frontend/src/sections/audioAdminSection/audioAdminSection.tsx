import React from 'react';

import MediaUploadSection from "../../components/mediaUploadSection/mediaUploadSection";
import AudioTrackList from "../../components/audioTrackList/audioTrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const AudioAdminSection = () => { //TODO: Use React.useMemo to this component
    const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);
    const [currentFileArray, setCurrentFileArray] = React.useState<File[]>([]);

    React.useEffect(() => {
        if(currentFileList) {
            for (let i = 0; i < currentFileList.length; ++i) {
                // audios.push(currentFileList[i]);
                setCurrentFileArray(prevState => [...prevState, currentFileList[i]]);
            }
        }
    }, [currentFileList])

    return (
        <>
            <MediaUploadSection
                caption={"File upload for Audio"}
                fileType={"audio/*"}
                setFile={setCurrentFileList}
                buttonCaption={"Select a file"}
            />
            <AudioTrackList fileArray={currentFileArray}/>
        </>
    );
};

export default AudioAdminSection;