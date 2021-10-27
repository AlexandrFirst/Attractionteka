import axios, {AxiosResponse} from "axios";
import {Service} from "./service";
import {IMediaResponse} from "../models/IMediaResponse";
import {LocalStorageKey} from "../models/LocalStorageKey";
import {ContentType} from "../models/ContentType";
import {IMediaFileDTO} from "../models/IMediaFileDTO";

export class EditorService extends Service {

    static async uploadMedia(file: FormData, contentType: ContentType): Promise<AxiosResponse<IMediaFileDTO>> {
        return axios.post<IMediaFileDTO>(`${Service.serverHost}/cloudinary/${contentType}`, file,
        {
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
            // }
        });
    }

    static async addNewPlace(
        content: string,
        name: string,
        shortDesc: string,
        keywords: string[],
        uploadTime: Date,
        photos: IMediaFileDTO[],
        videos: IMediaFileDTO[],
        audios: IMediaFileDTO[]
    ): Promise<AxiosResponse> {

        const body = {
            content,
            name,
            shortDesc,
            keywords,
            uploadTime,
            photos,
            videos,
            audios
        };

        console.log(body);

        return axios.post(`${Service.serverHost}/place/newplace`, body,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.token)}`,
            }
        });
    }
}