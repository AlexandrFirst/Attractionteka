import React from 'react';
import styles from './editor.module.scss';
import SunEditor, {buttonList} from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import {useActions} from "../../hooks/useActions"; // Import Sun Editor's CSS File


const Editor = () => {
    const editor = React.useRef<SunEditorCore>();
    const {uploadMedia} = useActions()

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    const onImageUploadBefore = (files: Array<File>, info: any, uploadHandler: any) => {
        console.log(files[0]);
        uploadMedia(files[0], "photo");
    }

    const onImageUpload = (
        targetImgElement: HTMLImageElement,
        index: number,
        state: string,
        imageInfo: object,
        remainingFilesCount: number) => {

    }


    const onVideoUploadBefore = (files: File[], info: object, uploadHandler: Function) => {
        const res = uploadMedia(files[0], "video");
        console.log(res);
    }

    return (
        <div className={styles.wrapper}>
            {/*<form action="" name="media">*/}
                <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
                    setOptions={{
                        buttonList: buttonList.complex,
                    }}
                    onImageUploadBefore={onImageUploadBefore}
                    // onImageUpload={onImageUpload}

                    onVideoUploadBefore={onVideoUploadBefore}
                />
            {/*</form>*/}
        </div>
    );
};

export default Editor;