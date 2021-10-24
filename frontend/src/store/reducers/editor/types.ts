import {IMediaResponse} from "../../../models/IMediaResponse";

export interface  IMediaData {
    data: IMediaResponse[];
    isLoading: boolean;
    error: string;
}

export interface IKeywordsData {
    data: string[];
    isLoading: boolean;
    error: string;
}

export interface EditorState {
    photos: IMediaData;
    audios: IMediaData;
    videos: IMediaData;
    keywords: IKeywordsData;
    // isLoading: boolean;
    // error: string;
}

export enum EditorActionsEnum {
    SET_PHOTOS="SET_PHOTOS",
    SET_IS_LOADING_PHOTOS="SET_IS_LOADING_PHOTOS",
    SET_IS_LOADING_AUDIOS="SET_IS_LOADING_AUDIOS",
    SET_IS_LOADING_VIDEOS="SET_IS_LOADING_VIDEOS",
    SET_ERROR_PHOTOS="SET_ERROR_PHOTOS",
    SET_ERROR_AUDIOS="SET_ERROR_AUDIOS",
    SET_ERROR_VIDEOS="SET_ERROR_VIDEOS",
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
    type: EditorActionsEnum.SET_IS_LOADING_PHOTOS | EditorActionsEnum.SET_IS_LOADING_AUDIOS | EditorActionsEnum.SET_IS_LOADING_VIDEOS;
    payload: boolean;
}

export interface SetErrorAction {
    type: EditorActionsEnum.SET_ERROR_PHOTOS | EditorActionsEnum.SET_ERROR_AUDIOS | EditorActionsEnum.SET_ERROR_VIDEOS;
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