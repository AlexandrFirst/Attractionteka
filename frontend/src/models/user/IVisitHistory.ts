import {IPlaceResponse} from "../place/IPlaceResponse";
import {IPlaceReadOnlyResponse} from "../place/IPlaceReadOnlyResponse";

export interface IVisitHistory {
    visitedPlace: IPlaceResponse
    visitTime: Date
}