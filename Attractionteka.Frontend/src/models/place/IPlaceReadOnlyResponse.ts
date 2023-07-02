import {IUserDTO} from "../auth/IUserDTO";

export interface IPlaceReadOnlyResponse {
    id: number;
    content: string;
    name: string;
    shortDescription: string;
    listKeyWords: string[];
    author: IUserDTO;
    uploadTime: Date;
}