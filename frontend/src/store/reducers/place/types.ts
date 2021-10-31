import {IPlaceReadOnlyResponse} from "../../../models/place/IPlaceReadOnlyResponse";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";


export interface PlaceState {
    isLoading: boolean;
    data: IPlaceResponse;
    error: string;
}

export enum PlaceActionsEnum {
    SET_IS_LOADING="SET_LOADING",
    SET_ERROR="SET_ERROR",
    SET_DATA="SET_DATA",
}

export interface SetPlaceAction {
    type: PlaceActionsEnum.SET_DATA;
    payload: IPlaceResponse;
}

export interface SetIsLoadingAction {
    type: PlaceActionsEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: PlaceActionsEnum.SET_ERROR;
    payload: string;
}

export type PlaceAction =
    SetPlaceAction |
    SetIsLoadingAction |
    SetErrorAction;