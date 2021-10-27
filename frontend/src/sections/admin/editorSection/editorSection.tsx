import React from 'react';
import styles from './editorSection.module.scss';
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor, {buttonList} from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import { useActions } from "../../../hooks/useActions";
import {IMediaResponse} from "../../../models/IMediaResponse";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {AppDispatch} from "../../../store";
import {useDispatch} from "react-redux";
import {EditorService} from "../../../services/editor-service";
import {EditorActionCreators} from "../../../store/reducers/editor/editor-action-creators";
import Spinner from "../../../components/spinner/spinner";
import {IMediaFileDTO} from "../../../models/IMediaFileDTO";

const EditorSection = () => {
    const editor = React.useRef<SunEditorCore>();
    // const {uploadMedia} = useActions();
    const [currentPhoto, setCurrentPhoto] = React.useState<IMediaFileDTO>();
    const {photos: {data: photos, isLoading, error} } = useTypedSelector(state => state.editor);
    const [content, setContent] = React.useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { setEditorContent } = useActions();
    // const {editorContent} = useTypedSelector(state => state.editor);

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
        setContent(editor.current?.getContents(false));
    };

    React.useEffect(() => {
        // console.log("PHOTOS........", photos);
        // console.log("media[media.length - 1]=", photos[photos.length - 1]);
        setCurrentPhoto(photos[photos.length - 1]);
        // console.log("Current photo.......", currentPhoto);
    }, [photos, currentPhoto, isLoading, error])

    React.useEffect(() => {
        // console.log("Content=", content);
        setEditorContent(content);
        // console.log("editorContent=", editorContent);
    }, [content])

    const onImageUploadBefore = (files: Array<File>, info: object, uploadHandler: Function) => {
        const sendingPhoto = new FormData();
        sendingPhoto.append("media", files[0]);

        async function requestToServer() {
            dispatch(EditorActionCreators.setIsLoadingPhotos(true));
            return await EditorService.uploadMedia(sendingPhoto, "photo");
        }

        requestToServer().then(res => {
            // console.log("res.data=", res.data)
            dispatch(EditorActionCreators.setPhoto(res.data));
            setCurrentPhoto(res.data);
            const imageOnServer = {
                // The response must have a "result" array.
                "result": [
                    {
                        "url": res?.data.url,
                        "name": files[0].name,
                        "size": files[0].size
                    },
                ]
            }

            // console.log(imageOnServer);
            uploadHandler(imageOnServer);

        }).catch(e => dispatch(EditorActionCreators.setErrorPhotos("Произошла ошибка при загрузке фотографии на сервер"))
        ).finally(() => dispatch(EditorActionCreators.setIsLoadingPhotos(false)));

    }

    const onBlur = () => {
        const tmpContent = editor.current?.getContents(false);
        tmpContent && setContent(tmpContent);
    }

    return (
        <div className={styles.wrapper}>
            {isLoading && <Spinner/>}
            <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                setOptions={{
                    buttonList: buttonList.complex ,
                    height: '800px',
                }}
                onImageUploadBefore={onImageUploadBefore}
                onBlur={onBlur}
                // onImageUpload={handleImageUpload}

                // onLoad={handleLoad}
                // setContents={""}
                // onVideoUploadBefore={onVideoUploadBefore}
            />
        </div>
    );
};

export default EditorSection;