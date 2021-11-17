import {IMediaResponse} from "../../../models/admin/IMediaResponse";
import {IMediaFileDTO} from "../../../models/admin/IMediaFileDTO";

export interface  IMediaData {
    data: IMediaResponse[];
    isLoading: boolean;
    error: string;
}


export interface EditorState {
    photos: IMediaData;
    audios: IMediaData;
    videos: IMediaData;
    attractionName: string;
    keywords: string[];
    editorContent: string;
    shortDescription: string;
    loadingAddNewPlace: boolean;
    errorAddNewPlace: string;
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
    SET_ATTRACTION_NAME="SET_ATTRACTION_NAME",

    SET_IS_LOADING_PHOTOS="SET_IS_LOADING_PHOTOS",
    SET_IS_LOADING_AUDIOS="SET_IS_LOADING_AUDIOS",
    SET_IS_LOADING_VIDEOS="SET_IS_LOADING_VIDEOS",
    SET_LOADING_PLACE="SET_LOADING_PLACE",

    SET_ERROR_PHOTOS="SET_ERROR_PHOTOS",
    SET_ERROR_AUDIOS="SET_ERROR_AUDIOS",
    SET_ERROR_VIDEOS="SET_ERROR_VIDEOS",
    SET_PLACE="SET_PLACE",

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

export interface SetAttractionNameAction {
    type: EditorActionsEnum.SET_ATTRACTION_NAME;
    payload: string;
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

export interface SetLoadingPlaceAction {
    type: EditorActionsEnum.SET_LOADING_PLACE;
    payload: boolean;
}

export interface SetErrorPlaceAction {
    type: EditorActionsEnum.SET_PLACE;
    payload: string;
}

export interface SetErrorAction {
    type: EditorActionsEnum.SET_ERROR_PHOTOS | EditorActionsEnum.SET_ERROR_AUDIOS | EditorActionsEnum.SET_ERROR_VIDEOS;
    payload: string;
}


export type EditorAction =
    SetPhotoAction |
    SetVideoAction |
    SetAudioAction |
    SetAttractionNameAction |
    SetEditorContentAction |
    SetKeywordsAction |
    SetShortDescriptionAction |
    DeleteAudioAction |
    DeleteVideoAction |
    SetIsLoadingAction |
    SetLoadingPlaceAction |
    SetErrorPlaceAction |
    SetErrorAction;