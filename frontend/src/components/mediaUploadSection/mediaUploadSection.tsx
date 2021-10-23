import React from 'react';
import Caption from "../caption/caption";
import FileUpload from "../fileUpload/fileUpload";
import Button from "../button/button";

import styles from "./mediaUploadSection.module.scss";

export interface MediaUploadSectionProps {
    caption: string;
    fileType: "audio/*" | "video/*";
    setFile: Function;
    buttonCaption: string;
}

const MediaUploadSection:React.FC<MediaUploadSectionProps>= (
    {
        caption,
        fileType,
        setFile,
        buttonCaption,
    }
) => {
    return (
        <div className={styles.file_wrapper}>
            <Caption classNames={styles.file_caption}>{caption}</Caption>
            <FileUpload
                setFile={setFile}
                accept={fileType}
            >
                <Button classes={styles.button}>{buttonCaption}</Button>
            </FileUpload>
        </div>
    );
};

export default MediaUploadSection;