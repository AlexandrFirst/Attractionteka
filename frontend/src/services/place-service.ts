import axios, {AxiosResponse} from "axios";
import {IPlaceResponse} from "../models/place/IPlaceResponse";
import {Service} from "./service";

export class PlaceService extends Service {

    static async getPlace(id: number) :Promise<AxiosResponse<IPlaceResponse>> {
        return axios.get<IPlaceResponse>(`${Service.serverHost}/place/${id}`);
    }
}