import axios, {AxiosResponse} from "axios";
import {Service} from "./service";
import {IMediaResponse} from "../models/IMediaResponse";
import {LocalStorageKey} from "../models/LocalStorageKey";
import {ContentType} from "../models/ContentType";

export class EditorService extends Service {

    static async uploadMedia(file: File, contentType: ContentType): Promise<AxiosResponse<IMediaResponse>> {
        return axios.post<IMediaResponse>(`${Service.serverHost}/Cloudinary/${contentType}`, file,
        // {
        //     Authorization: localStorage.getItem(LocalStorageKey.token),
        // }
        );

    }
}