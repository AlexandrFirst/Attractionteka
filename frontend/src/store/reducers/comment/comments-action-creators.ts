import {AppDispatch} from "../../index";
import {CommentDTO} from "../../../models/comment/CommentDTO";
import {CommentsAction, SetCommentsAction, SetErrorAction, SetIsLoadingAction} from "./types";
import {CommentService} from "../../../services/comment-service";

export const CommentsActionCreators = {
    setData: (payload: CommentDTO[]): SetCommentsAction => ({ type: CommentsAction.SET_COMMENTS, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: CommentsAction.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: CommentsAction.SET_ERROR, payload }),

    getComments: (placeId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentsActionCreators.setIsLoading(true));
            const response = await CommentService.getComments(placeId);
            dispatch(CommentsActionCreators.setData(response.data));
            // console.log("Тут получен ответ с сервера про photo=", response.data);
            return response;
        } catch (e) {
            dispatch(CommentsActionCreators.setError("Произошла ошибка при загрузке комментариев"));
        } finally {
            dispatch(CommentsActionCreators.setIsLoading(false));
        }
    },

}