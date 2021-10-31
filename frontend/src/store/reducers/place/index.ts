import {PlaceAction, PlaceActionsEnum, PlaceState} from "./types";
import {IPlaceReadOnlyResponse} from "../../../models/place/IPlaceReadOnlyResponse";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";

const initialState: PlaceState = {
    isLoading: false,
    data: {} as IPlaceResponse,
    error: '',
}


export default function placeReducer(state = initialState, action: PlaceAction): PlaceState {
    switch (action.type) {

        case PlaceActionsEnum.SET_DATA:
            return { ...state, data: action.payload, isLoading: false, error: '' }

        case PlaceActionsEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }

        case PlaceActionsEnum.SET_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}