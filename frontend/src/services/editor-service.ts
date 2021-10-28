import axios, {AxiosResponse} from "axios";
import {Service} from "./service";
import {IMediaResponse} from "../models/admin/IMediaResponse";
import {LocalStorageKey} from "../types/LocalStorageKey";
import {ContentType} from "../types/ContentType";
import {IMediaFileDTO} from "../models/admin/IMediaFileDTO";
import {IPlaceResponse} from "../models/admin/IPlaceResponse";

export class EditorService extends Service {

    static async uploadMedia(file: FormData, contentType: ContentType): Promise<AxiosResponse<IMediaResponse>> {
        return axios.post<IMediaResponse>(`${Service.serverHost}/cloudinary/${contentType}`, file,
        {
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
            // }
        });
    }

    static async addNewPlace(
        content: string,
        name: string,
        shortDescription: string,
        listKeywords: string[],
        uploadTime: Date,
        photos: IMediaFileDTO[],
        videos: IMediaFileDTO[],
        audios: IMediaFileDTO[]
    ): Promise<AxiosResponse<IPlaceResponse>> {

        const body = {
            content,
            name,
            shortDescription ,
            listKeywords,
            uploadTime,
            photos,
            videos,
            audios
        };

        console.log(body);

        return axios.post<IPlaceResponse>(`${Service.serverHost}/place/newplace`,
            body,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
            }
        });
    }
}