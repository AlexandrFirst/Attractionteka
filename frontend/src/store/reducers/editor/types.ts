import {IMediaResponse} from "../../../models/IMediaResponse";

export interface  IMediaData {
    data: IMediaResponse[];
    isLoading: boolean;
    error: string;
}


export interface EditorState {
    photos: IMediaData;
    audios: IMediaData;
    videos: IMediaData;
    keywords: string[];
    editorContent: string;
    shortDescription: string;
    loadingAddNewPlace: boolean;
    // isLoading: boolean;
    // error: string;
}

export enum EditorActionsEnum {
    SET_PHOTOS="SET_PHOTOS",
    SET_VIDEOS="SET_VIDEOS",
    SET_KEYWORDS="SET_KEYWORDS",
    SET_AUDIOS="SET_AUDIOS",
    SET_EDITOR_CONTENT="SET_EDITOR_CONTENT",
    SET_SHORT_DESCRIPTION="SET_SHORT_DESCRIPTION",

    SET_IS_LOADING_PHOTOS="SET_IS_LOADING_PHOTOS",
    SET_IS_LOADING_AUDIOS="SET_IS_LOADING_AUDIOS",
    SET_IS_LOADING_VIDEOS="SET_IS_LOADING_VIDEOS",
    SET_LOADING_ADD_NEW_PLACE="SET_LOADING_ADD_NEW_PLACE",

    SET_ERROR_PHOTOS="SET_ERROR_PHOTOS",
    SET_ERROR_AUDIOS="SET_ERROR_AUDIOS",
    SET_ERROR_VIDEOS="SET_ERROR_VIDEOS",

    DELETE_AUDIO="DELETE_AUDIO",
    DELETE_VIDEO="DELETE_VIDEO",
}

export interface SetPhotoAction {
    type: EditorActionsEnum.SET_PHOTOS;
    payload: IMediaResponse;
}

export interface SetVideoAction {
    type: EditorActionsEnum.SET_VIDEOS;
    payload: IMediaResponse;
}

export interface SetAudioAction {
    type: EditorActionsEnum.SET_AUDIOS;
    payload: IMediaResponse;
}

export interface SetKeywordsAction {
    type: EditorActionsEnum.SET_KEYWORDS;
    payload: string[];
}

export interface SetEditorContentAction {
    type: EditorActionsEnum.SET_EDITOR_CONTENT;
    payload: string;
}

export interface SetShortDescriptionAction {
    type: EditorActionsEnum.SET_SHORT_DESCRIPTION;
    payload: string;
}

export interface DeleteVideoAction {
    type: EditorActionsEnum.DELETE_VIDEO;
    payload: IMediaResponse;
}

export interface DeleteAudioAction {
    type: EditorActionsEnum.DELETE_AUDIO;
    payload: IMediaResponse;
}

export interface SetIsLoadingAction {
    type: EditorActionsEnum.SET_IS_LOADING_PHOTOS | EditorActionsEnum.SET_IS_LOADING_AUDIOS | EditorActionsEnum.SET_IS_LOADING_VIDEOS;
    payload: boolean;
}

export interface SetLoadingNewPlaceAction {
    type: EditorActionsEnum.SET_LOADING_ADD_NEW_PLACE;
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
    SetEditorContentAction |
    SetKeywordsAction |
    SetShortDescriptionAction |
    DeleteAudioAction |
    DeleteVideoAction |
    SetIsLoadingAction |
    SetLoadingNewPlaceAction |
    SetErrorAction;