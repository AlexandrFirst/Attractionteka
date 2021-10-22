import React from 'react';
import styles from './editor.module.scss';
import SunEditor, {buttonList} from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import {useActions} from "../../hooks/useActions";
import {IMediaResponse} from "../../models/IMediaResponse";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {EditorService} from "../../services/editor-service";
import {EditorActionCreators} from "../../store/reducers/editor/editor-action-creators";
import Spinner from "../spinner/spinner";


const Editor = () => {
    const editor = React.useRef<SunEditorCore>();
    const {uploadMedia} = useActions();
    const [currentMedia, setCurrentMedia] = React.useState<IMediaResponse>();
    const {media, isLoading, error} = useTypedSelector(state => state.editor);
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
            console.log("MEDIA........", media);
            console.log("media[media.length - 1]=", media[media.length - 1]);
            setCurrentMedia(media[media.length - 1]);
            console.log("Current media.......", currentMedia);
        }
    }, [media, currentMedia, isLoading, error])

    React.useEffect(() => {
        console.log("Content=", content);
    }, [content])

    const onImageUploadBefore = async (files: Array<File>, info: object, uploadHandler: Function) => {
        const sendingPhoto = new FormData();
        sendingPhoto.append("media", files[0]);

        async function requestToServer() {
            dispatch(EditorActionCreators.setIsLoading(true));
            return await EditorService.uploadMedia(sendingPhoto, "photo");
        }

        requestToServer().then(res => {
            console.log("res.data=", res.data)
            dispatch(EditorActionCreators.setMedia(res.data));
            setCurrentMedia(res.data);
            const response = {
                // The response must have a "result" array.
                "result": [
                    {
                        "url": res?.data.url,
                        "name": files[0].name,
                        "size": files[0].size
                    },
                ]
            }
            console.log(currentMedia);
            uploadHandler(response);
        }).catch(e => dispatch(EditorActionCreators.setError("Произошла ошибка при загрузке медиафайла на сервер"))
        ).finally(() => dispatch(EditorActionCreators.setIsLoading(false)));
        // console.log("CURMED=",currentMedia);
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
    //     // editor.current?.appendContents("<h1>Content</h1>");
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
            <div className={styles.wrapper}>
                {/*<form action="" name="media">*/}
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
                {/*</form>*/}
            </div>
        </>
    );
};

export default Editor;