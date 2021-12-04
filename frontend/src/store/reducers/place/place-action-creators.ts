import {
    PlaceActionsEnum,
    SetErrorAction,
    SetFilteredPlacesAction,
    SetIsLoadingAction,
    SetPlaceAction,
    SetRatingAction
} from "./types";
import {AppDispatch} from "../../index";
import {PlaceService} from "../../../services/place-service";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";
import {PlaceFilterDto} from "../../../models/place/PlaceFilterDto";


export const PlaceActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type:PlaceActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type:PlaceActionsEnum.SET_ERROR, payload }),
    setPlace: (payload: IPlaceResponse): SetPlaceAction => ({ type: PlaceActionsEnum.SET_DATA, payload }),
    setFilteredPlaces: (payload: IPlaceResponse[]): SetFilteredPlacesAction => ({ type: PlaceActionsEnum.SET_FILTERED_PLACES, payload }),
    setRating: (payload: number): SetRatingAction => ({ type: PlaceActionsEnum.SET_RATING, payload }),

    getPlace: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PlaceActionCreators.setIsLoading(true));
            const response = await PlaceService.getPlace(id);
            dispatch(PlaceActionCreators.setPlace(response.data));
            console.log("getPlace_______________",response.data)
        } catch (e: any) {
            dispatch(PlaceActionCreators.setError("При загрузке достопримичательности произошла ошибка"))
        } finally {
            dispatch(PlaceActionCreators.setIsLoading(false))
        }
    },

    searchPlaces: (placeFilter: PlaceFilterDto) => async (dispatch: AppDispatch) => {
        try {
            // dispatch(PlaceActionCreators.setIsLoading(true));
            const response = await PlaceService.getPlaces(placeFilter);
            dispatch(PlaceActionCreators.setFilteredPlaces(response.data));
            // console.log("ПОЛУЧЕН ОТВЕТ ПРИ ПОЛУЧЕНИИ ОТФИЛЬТРОВАННЫХ ДОСТОПРИМИЧАТЕЛЬНОСТЕЙ", response.data);
        } catch (e: any) {
            dispatch(PlaceActionCreators.setError("При загрузке достопримичательностей произошла ошибка"))
        } finally {
            // dispatch(PlaceActionCreators.setIsLoading(false))
        }
    },

    setRatingToDatabase: (rating: number, placeId: number) => async (dispatch: AppDispatch) => {
        try {
            // dispatch(PlaceActionCreators.setIsLoading(true));
            await PlaceService.setRating(rating, placeId);
            // dispatch(PlaceActionCreators.setPlace(response.data));
            // console.log("ПОЛУЧЕН ОТВЕТ ПРИ ПОЛУЧЕНИИ ОТФИЛЬТРОВАННЫХ ДОСТОПРИМИЧАТЕЛЬНОСТЕЙ", response.data);
        } catch (e: any) {
            dispatch(PlaceActionCreators.setError("Невозможно установить рейтинг"))
        } finally {
            dispatch(PlaceActionCreators.setIsLoading(false))
        }
    },

}