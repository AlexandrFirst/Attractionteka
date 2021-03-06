import axios, {AxiosResponse} from "axios";
import {Service} from "./service";
import {IMediaResponse} from "../models/admin/IMediaResponse";
import {LocalStorageKey} from "../types/LocalStorageKey";
import {ContentType} from "../types/ContentType";
import {IMediaFileDTO} from "../models/admin/IMediaFileDTO";
import {IPlaceResponse} from "../models/place/IPlaceResponse";

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

        return axios.post<IPlaceResponse>(`${Service.serverHost}/place/newplace`,
            body,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
            }
        });
    }

    static async updateInfoPlace(
        id: number,
        content: string,
        name: string,
        shortDescription: string,
        listKeywords: string[],
        uploadTime: Date,
        photos: IMediaFileDTO[],
        videos: IMediaFileDTO[],
        audios: IMediaFileDTO[]
    ) {
        const body = {
            id,
            content,
            name,
            shortDescription ,
            listKeywords,
            uploadTime,
            photos,
            videos,
            audios
        };

        return axios.put(`${Service.serverHost}/place/${id}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
                }
            });
    }

    static async deletePlace(id: number): Promise<AxiosResponse> {
        return axios.delete(`${Service.serverHost}/place/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
                }
            });
    }
}