import {EditorActionsEnum, SetErrorAction, SetIsLoadingAction, SetMediaAction} from "./types";
import {AppDispatch} from "../../index";
import {EditorService} from "../../../services/editor-service";
import {ContentType} from "../../../models/ContentType";


export const EditorActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type:EditorActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type:EditorActionsEnum.SET_ERROR, payload }),
    setMedia: (payload: File): SetMediaAction => ({ type: EditorActionsEnum.SET_MEDIA, payload }),

    uploadMedia: (media: File, contentType: ContentType) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EditorActionCreators.setIsLoading(true));
            const response = await EditorService.uploadMedia(media, contentType);
            // console.log(response.data);
            dispatch(EditorActionCreators.setMedia(media));
            return response.data;
        } catch (e: any) {
            dispatch(EditorActionCreators.setError(e))
        } finally {
            dispatch(EditorActionCreators.setIsLoading(false))
        }
    }
}