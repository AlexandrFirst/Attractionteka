import {CommentDTO} from "../../../models/comment/CommentDTO";

export interface CommentsState {
    data: CommentDTO[];
    isLoading: boolean;
    error: string;
}

export enum CommentsAction {
    SET_COMMENTS="SET_COMMENTS",
    SET_IS_LOADING="SET_IS_LOADING",
    SET_ERROR="SET_ERROR",
}


export interface SetCommentsAction {
    type: CommentsAction.SET_COMMENTS;
    payload: CommentDTO[];
}

export interface SetIsLoadingAction {
    type: CommentsAction.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: CommentsAction.SET_ERROR;
    payload: string;
}


export type CommentsActionType =
    SetCommentsAction |
    SetIsLoadingAction |
    SetErrorAction;