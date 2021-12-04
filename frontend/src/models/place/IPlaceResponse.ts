import {IMediaResponse} from "../admin/IMediaResponse";
import {IRating} from "./IRating";


export interface IPlaceResponse {
    id: number;
    content: string;
    name: string;
    shortDescription: string;
    listKeyWords: string[];
    uploadTime: Date;
    photos: IMediaResponse[];
    videos: IMediaResponse[];
    audios: IMediaResponse[];
    averageRating: number;
    viewNumber: number;
    ratings: IRating[];
}



// export interface idValueKeyWords {
//     $id: number;
//     $values: string[];
// }
//
// export interface idValueMedia {
//     $id: number;
//     $values: IMediaResponse[];
// }


