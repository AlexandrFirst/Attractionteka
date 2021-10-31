import {
    DeleteAudioAction,
    DeleteVideoAction,
    EditorActionsEnum, EditorState, SetAttractionNameAction,
    SetAudioAction,
    SetEditorContentAction,
    SetErrorAction, SetErrorNewPlaceAction,
    SetIsLoadingAction,
    SetKeywordsAction,
    SetLoadingNewPlaceAction,
    SetPhotoAction,
    SetShortDescriptionAction,
    SetVideoAction
} from "./types";
import {AppDispatch} from "../../index";
import {EditorService} from "../../../services/editor-service";
import {IMediaResponse} from "../../../models/admin/IMediaResponse";
import {IMediaFileDTO} from "../../../models/admin/IMediaFileDTO";


export const EditorActionCreators = {

    setIsLoadingPhotos: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING_PHOTOS, payload }),
    setIsLoadingAudios: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING_AUDIOS, payload }),
    setIsLoadingVideos: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING_VIDEOS, payload }),
    setLoadingAddNewPlace: (payload: boolean): SetLoadingNewPlaceAction => ({ type: EditorActionsEnum.SET_LOADING_ADD_NEW_PLACE, payload }),

    setErrorPhotos: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR_PHOTOS, payload }),
    setErrorAudios: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR_AUDIOS, payload }),
    setErrorVideos: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR_VIDEOS, payload }),
    setErrorAddNewPlace: (payload: string): SetErrorNewPlaceAction => ({ type:EditorActionsEnum.SET_ERROR_ADD_NEW_PLACE, payload }),

    setPhoto: (payload: IMediaResponse): SetPhotoAction => ({ type: EditorActionsEnum.SET_PHOTOS, payload }),
    setAudio: (payload: IMediaResponse): SetAudioAction => ({ type: EditorActionsEnum.SET_AUDIOS, payload }),
    setVideo: (payload: IMediaResponse): SetVideoAction => ({ type: EditorActionsEnum.SET_VIDEOS, payload }),
    setKeywords: (payload: string[]): SetKeywordsAction => ({ type:EditorActionsEnum.SET_KEYWORDS, payload }),
    setEditorContent: (payload: string): SetEditorContentAction => ({ type: EditorActionsEnum.SET_EDITOR_CONTENT, payload }),
    setShortDescription: (payload: string): SetShortDescriptionAction => ({ type: EditorActionsEnum.SET_SHORT_DESCRIPTION, payload }),
    setAttractionName: (payload: string): SetAttractionNameAction => ({ type: EditorActionsEnum.SET_ATTRACTION_NAME, payload }),

    deleteAudio: (payload: IMediaResponse): DeleteAudioAction => ({ type: EditorActionsEnum.DELETE_AUDIO, payload }),
    deleteVideo: (payload: IMediaResponse): DeleteVideoAction => ({ type: EditorActionsEnum.DELETE_VIDEO, payload }),

    uploadPhoto: (media: FormData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoadingPhotos(true));
            const response = await EditorService.uploadMedia(media, "photo");
            dispatch(EditorActionCreators.setPhoto(response.data));
            // console.log("Тут получен ответ с сервера про photo=", response.data);
            return response;
        } catch (e) {
            dispatch(EditorActionCreators.setErrorPhotos("Произошла ошибка при загрузке картинки"));
        } finally {
            dispatch(EditorActionCreators.setIsLoadingPhotos(false));
        }
    },

    uploadAudio: (media: FormData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoadingAudios(true));
            const response = await EditorService.uploadMedia(media, "audio"); //??? PATH FROM CLOUDINARY IS .../video/... ???
            dispatch(EditorActionCreators.setAudio(response.data));
            // console.log("Тут получен ответ с сервера про audio=", response.data);
            return response;
        } catch (e) {
            dispatch(EditorActionCreators.setErrorAudios("Произошла ошибка при загрузке аудиофайла"));
        } finally {
            dispatch(EditorActionCreators.setIsLoadingAudios(false));
        }
    },

    uploadVideo: (media: FormData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoadingVideos(true));
            const response = await EditorService.uploadMedia(media, "video"); //??? RETURNS $id=1 EVERYTIME ???
            dispatch(EditorActionCreators.setVideo(response.data));
            // console.log("Тут получен ответ с сервера про video=", response.data);
            return response;
        } catch (e) {
            dispatch(EditorActionCreators.setErrorVideos("Произошла ошибка при загрузке видеофайла"));
        } finally {
            dispatch(EditorActionCreators.setIsLoadingVideos(false));
        }
    },

    addNewPlace: (
            photos: IMediaFileDTO[],
            videos: IMediaFileDTO[],
            audios: IMediaFileDTO[],
            {
                editorContent,
                keywords,
                shortDescription,
                attractionName
            }: EditorState
    ) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setLoadingAddNewPlace(true));
            const nowDate = new Date();
            const res = await EditorService.addNewPlace(
                editorContent, attractionName, shortDescription,
                keywords, nowDate,
                photos, videos, audios
            );
            console.log("ПОЛУЧЕН ОТВЕТ ПРИ СОЗДАНИИ ДОСТОПРИМЕЧАТЕЛЬНОСТИ...........", res.data);

        } catch (e) {
            EditorActionCreators.setErrorAddNewPlace("An error occurred while adding a new attraction");
        } finally {
            dispatch(EditorActionCreators.setLoadingAddNewPlace(false));
        }
    }
}