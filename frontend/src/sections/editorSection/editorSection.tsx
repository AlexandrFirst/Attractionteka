import React from 'react';
import styles from './editorSection.module.scss';
import SunEditor, {buttonList} from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import { Link } from 'react-router-dom';
import { useActions } from "../../hooks/useActions";
import {IMediaResponse} from "../../models/IMediaResponse";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {EditorService} from "../../services/editor-service";
import {EditorActionCreators} from "../../store/reducers/editor/editor-action-creators";
import Spinner from "../../components/spinner/spinner";
import arrowBack from './img/arrow_icon.svg';
import AudioAdminSection from "../audioAdminSection/audioAdminSection";

const EditorSection = () => {
    const editor = React.useRef<SunEditorCore>();
    // const {uploadMedia} = useActions();
    const [currentPhoto, setCurrentPhoto] = React.useState<IMediaResponse>();
    const {photos: {data: photos, isLoading, error} } = useTypedSelector(state => state.editor);
    const [content, setContent] = React.useState("");
    const dispatch = useDispatch<AppDispatch>();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
        setContent(editor.current?.getContents(false));
    };

    React.useEffect(() => {
        // if(isLoading) { //BLOCK FOR DEVELOPMENT ONLY
        //     console.log("LOADING......");
        // }
        // else if(error) { //BLOCK FOR DEVELOPMENT ONLY
        //     console.log(error);
        // }
        // else
        {
            // console.log("PHOTOS........", photos);
            // console.log("media[media.length - 1]=", photos[photos.length - 1]);
            setCurrentPhoto(photos[photos.length - 1]);
            // console.log("Current photo.......", currentPhoto);
        }
    }, [photos, currentPhoto, isLoading, error])

    React.useEffect(() => {
        // console.log("Content=", content);
    }, [content])

    const onImageUploadBefore = async (files: Array<File>, info: object, uploadHandler: Function) => {
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
            // console.log(currentPhoto);
            uploadHandler(imageOnServer);
        }).catch(e => dispatch(EditorActionCreators.setErrorPhotos("Произошла ошибка при загрузке медиафайла на сервер"))
        ).finally(() => dispatch(EditorActionCreators.setIsLoadingPhotos(false)));
    }

    // const onImageUpload = (
    //     targetImgElement: HTMLImageElement,
    //     index: number,
    //     state: string,
    //     imageInfo: object,
    //     remainingFilesCount: number) => {
    //     if (currentMedia?.Url) {
    //         targetImgElement.src = currentMedia?.Url;
    //         console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
    //     }
    //     if(currentMedia){
    //         console.log(currentMedia.Url)
    //     } else {
    //         console.log("ХУЙ ТЕБЕ")
    //     }
    // }

    // const setEditorContent = (): string => {
    //     // editorSection.current?.appendContents("<h1>Content</h1>");
    //
    //     return content;
    // }

    // const handleLoad = (reload: boolean) => {
    //     console.log(reload); //Boolean
    //     // setEditorContent();
    // }
    // const onVideoUploadBefore = (files: File[], info: object, uploadHandler: Function) => {
    //     const res = uploadMedia(files[0], "video");
    //     console.log(res);
    // }
    // if(isLoading) {
    //     return <Spinner/>
    // }

    const onChange = () => {
        const tmpContent = editor.current?.getContents(false)
        tmpContent && setContent(tmpContent);
    }

    return (
        <>
            {isLoading && <Spinner/>}
            <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                setOptions={{
                    buttonList: buttonList.complex,
                    height: '400px',
                }}
                onImageUploadBefore={onImageUploadBefore}
                onChange={onChange}
                // onImageUpload={onImageUpload}

                // onLoad={handleLoad}
                // setContents={""}
                // onVideoUploadBefore={onVideoUploadBefore}
            />
        </>
    );
};

export default EditorSection;