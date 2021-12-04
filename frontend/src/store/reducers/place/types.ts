import {IPlaceReadOnlyResponse} from "../../../models/place/IPlaceReadOnlyResponse";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";


export interface PlaceState {
    isLoading: boolean;
    data: IPlaceResponse;
    filteredPlaces: IPlaceResponse[];
    error: string;
    rating: number;
}

export enum PlaceActionsEnum {
    SET_IS_LOADING="SET_LOADING",
    SET_ERROR="SET_ERROR",
    SET_DATA="SET_DATA",
    SET_FILTERED_PLACES="SET_FILTERED_PLACES",
    SET_RATING="SET_RATING",

}

export interface SetPlaceAction {
    type: PlaceActionsEnum.SET_DATA;
    payload: IPlaceResponse;
}

export interface SetFilteredPlacesAction {
    type: PlaceActionsEnum.SET_FILTERED_PLACES;
    payload: IPlaceResponse[];
}

export interface SetIsLoadingAction {
    type: PlaceActionsEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: PlaceActionsEnum.SET_ERROR;
    payload: string;
}

export interface SetRatingAction {
    type: PlaceActionsEnum.SET_RATING;
    payload: number;
}

export type PlaceAction =
    SetPlaceAction |
    SetFilteredPlacesAction |
    SetIsLoadingAction |
    SetErrorAction |
    SetRatingAction;