import {IMediaResponse} from "../../../models/IMediaResponse";

export interface EditorState {
    photos: IMediaResponse[];
    audios: IMediaResponse[];
    videos: IMediaResponse[];
    keywords: string[];
    isLoading: boolean;
    error: string;
}

export enum EditorActionsEnum {
    SET_PHOTOS="SET_PHOTOS",
    SET_IS_LOADING="SET_IS_LOADING",
    SET_ERROR="SET_ERROR",
    SET_AUDIOS="SET_AUDIOS",
    DELETE_AUDIO="DELETE_AUDIO",
    SET_VIDEOS="SET_VIDEOS",
    DELETE_VIDEO="DELETE_VIDEO",
    SET_KEYWORDS="SET_KEYWORDS",
}

export interface SetPhotoAction {
    type: EditorActionsEnum.SET_PHOTOS;
    payload: IMediaResponse;
}

export interface SetVideoAction {
    type: EditorActionsEnum.SET_VIDEOS;
    payload: IMediaResponse;
}

export interface DeleteVideoAction {
    type: EditorActionsEnum.DELETE_VIDEO;
    payload: IMediaResponse;
}

export interface SetAudioAction {
    type: EditorActionsEnum.SET_AUDIOS;
    payload: IMediaResponse;
}

export interface DeleteAudioAction {
    type: EditorActionsEnum.DELETE_AUDIO;
    payload: IMediaResponse;
}

export interface SetKeywordsAction {
    type: EditorActionsEnum.SET_KEYWORDS;
    payload: string[];
}

export interface SetIsLoadingAction {
    type: EditorActionsEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: EditorActionsEnum.SET_ERROR;
    payload: string;
}


export type EditorAction =
    SetPhotoAction |
    SetVideoAction |
    SetAudioAction |
    DeleteAudioAction |
    DeleteVideoAction |
    SetKeywordsAction |
    SetIsLoadingAction |
    SetErrorAction;