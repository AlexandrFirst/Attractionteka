import {
    EditorActionsEnum,
    SetAudioAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetPhotoAction,
    SetVideoAction
} from "./types";
import {AppDispatch} from "../../index";
import {EditorService} from "../../../services/editor-service";
import {ContentType} from "../../../models/ContentType";
import {IMediaResponse} from "../../../models/IMediaResponse";


export const EditorActionCreators = {

    setIsLoadingPhotos: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING_PHOTOS, payload }),
    setIsLoadingAudios: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING_AUDIOS, payload }),
    setIsLoadingVideos: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING_VIDEOS, payload }),

    setErrorPhotos: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR_PHOTOS, payload }),
    setErrorAudios: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR_AUDIOS, payload }),
    setErrorVideos: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR_VIDEOS, payload }),

    setPhoto: (payload: IMediaResponse): SetPhotoAction => ({ type: EditorActionsEnum.SET_PHOTOS, payload }),
    setAudio: (payload: IMediaResponse): SetAudioAction => ({ type: EditorActionsEnum.SET_AUDIOS, payload }),
    setVideo: (payload: IMediaResponse): SetVideoAction => ({ type: EditorActionsEnum.SET_VIDEOS, payload }),

    uploadPhoto: (media: FormData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoadingPhotos(true));
            const response = await EditorService.uploadMedia(media, "photo");
            dispatch(EditorActionCreators.setPhoto(response.data));
            console.log("Тут получен ответ с сервера про photo=", response.data);
            return response;
        } catch (e) {
            dispatch(EditorActionCreators.setErrorPhotos("Произошла ошибка при загрузке медиафайла"));
        } finally {
            dispatch(EditorActionCreators.setIsLoadingPhotos(false));
        }
    },

    uploadAudio: (media: FormData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoadingAudios(true));
            const response = await EditorService.uploadMedia(media, "audio");
            dispatch(EditorActionCreators.setAudio(response.data));
            console.log("Тут получен ответ с сервера про audio=", response.data);
            return response;
        } catch (e) {
            dispatch(EditorActionCreators.setErrorAudios("Произошла ошибка при загрузке медиафайла"));
        } finally {
            dispatch(EditorActionCreators.setIsLoadingAudios(false));
        }
    },

    uploadVideo: (media: FormData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoadingVideos(true));
            const response = await EditorService.uploadMedia(media, "video");
            dispatch(EditorActionCreators.setVideo(response.data));
            console.log("Тут получен ответ с сервера про video=", response.data);
            return response;
        } catch (e) {
            dispatch(EditorActionCreators.setErrorVideos("Произошла ошибка при загрузке медиафайла"));
        } finally {
            dispatch(EditorActionCreators.setIsLoadingVideos(false));
        }
    },

    // uploadMedia: (media: FormData, contentType: ContentType) => async (dispatch: AppDispatch) => {
    //     try {
    //         dispatch(EditorActionCreators.setIsLoading(true));
    //         const response = await EditorService.uploadMedia(media, contentType);
    //         // console.log(response.data);
    //
    //         switch (contentType) {
    //             case "photo":
    //                 dispatch(EditorActionCreators.setPhoto(response.data));
    //                 break;
    //
    //             case "audio":
    //                 dispatch(EditorActionCreators.setAudios(response.data));
    //                 break;
    //         }
    //
    //         console.log("Тут получен ответ с сервера=", response.data);
    //         return response;
    //     } catch (e: any) {
    //         dispatch(EditorActionCreators.setError("Произошла ошибка при загрузке медиафайла"));
    //     } finally {
    //         dispatch(EditorActionCreators.setIsLoading(false));
    //     }
    // }
}