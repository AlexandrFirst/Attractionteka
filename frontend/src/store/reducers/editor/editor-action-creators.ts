import {EditorActionsEnum, SetAudioAction, SetErrorAction, SetIsLoadingAction, SetPhotoAction} from "./types";
import {AppDispatch} from "../../index";
import {EditorService} from "../../../services/editor-service";
import {ContentType} from "../../../models/ContentType";
import {IMediaResponse} from "../../../models/IMediaResponse";


export const EditorActionCreators = {

    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR, payload }),
    setPhoto: (payload: IMediaResponse): SetPhotoAction => ({ type: EditorActionsEnum.SET_PHOTOS, payload }),
    setAudios: (payload: IMediaResponse): SetAudioAction => ({ type: EditorActionsEnum.SET_AUDIOS, payload }),

    uploadMedia: (media: FormData, contentType: ContentType) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoading(true));
            const response = await EditorService.uploadMedia(media, contentType);
            // console.log(response.data);

            switch (contentType) {
                case "photo":
                    dispatch(EditorActionCreators.setPhoto(response.data));
                    break;

                case "audio":
                    dispatch(EditorActionCreators.setAudios(response.data));
                    break;
            }

            console.log("Тут получен ответ с сервера=", response.data);
            return response;
        } catch (e: any) {
            dispatch(EditorActionCreators.setError("Произошла ошибка при загрузке медиафайла"));
        } finally {
            dispatch(EditorActionCreators.setIsLoading(false));
        }
    }
}