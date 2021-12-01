import React from 'react';

import MediaUploadSection from "../mediaUploadSection/mediaUploadSection";
import AudioTrackList from "../../../components/audioTrackList/audioTrackList";
import {IMediaResponse} from "../../../models/admin/IMediaResponse";
import {useActions} from "../../../hooks/useActions";

export interface AudioAdminSectionProps {
    initialAudio?: IMediaResponse[];
}

const AudioAdminSection:React.FC<AudioAdminSectionProps> = ({initialAudio}) => { //TODO: Use React.useMemo to this component
    const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);


    return (
        <>
            <MediaUploadSection
                caption={"File upload for Audio"}
                fileType={"audio/*"}
                setFileList={setCurrentFileList}
                buttonCaption={"Select a file"}
            />
            <AudioTrackList fileList={currentFileList} initialAudio={initialAudio}/>
        </>
    );
};

export default AudioAdminSection;