import {PlaceActionsEnum, SetErrorAction, SetIsLoadingAction, SetPlaceAction} from "./types";
import {AppDispatch} from "../../index";
import {PlaceService} from "../../../services/place-service";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";


export const PlaceActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type:PlaceActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type:PlaceActionsEnum.SET_ERROR, payload }),
    setPlace: (payload: IPlaceResponse): SetPlaceAction => ({ type: PlaceActionsEnum.SET_DATA, payload }),

    getPlace: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PlaceActionCreators.setIsLoading(true));
            const response = await PlaceService.getPlace(id);
            console.log("HERE WE GET RESPONSE FROM SERVER.....", response.data);
            dispatch(PlaceActionCreators.setPlace(response.data));
        } catch (e: any) {
            dispatch(PlaceActionCreators.setError("При загрузке достопримичательности произошла ошибка"))
        } finally {
            dispatch(PlaceActionCreators.setIsLoading(false))
        }
    },

}