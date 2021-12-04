import axios, {AxiosResponse} from "axios";
import {IPlaceResponse} from "../models/place/IPlaceResponse";
import {Service} from "./service";
import {PlaceFilterDto} from "../models/place/PlaceFilterDto";
import {LocalStorageKey} from "../types/LocalStorageKey";

export class PlaceService extends Service {

    static async getPlace(id: number) :Promise<AxiosResponse<IPlaceResponse>> {
        return axios.get<IPlaceResponse>(`${Service.serverHost}/place/${id}`);
    }

    static async getPlaces(placeFilter: PlaceFilterDto) :Promise<AxiosResponse<IPlaceResponse[]>> {
        const token = localStorage.getItem(LocalStorageKey.token);

        return axios.get<IPlaceResponse[]>(`${Service.serverHost}/place/getPlaces`,
            {
                params: {
                    ...placeFilter
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    }

    static async setRating(rating: number, placeId: number) :Promise<AxiosResponse<IPlaceResponse>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return axios.post<IPlaceResponse>(`${Service.serverHost}/place/setRating`, {rating, placeId},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}