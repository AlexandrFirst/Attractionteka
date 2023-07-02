import {Service} from "./service";
import axios, {AxiosResponse} from "axios";
import {CommentDTO} from "../models/comment/CommentDTO";
import {CreateCommentDTO} from "../models/comment/CreateCommentDTO";
import {LocalStorageKey} from "../types/LocalStorageKey";


export class CommentService extends Service {


    static async getComments(placeId: number): Promise<AxiosResponse<CommentDTO[]>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return axios.get<CommentDTO[]>(`${Service.serverHost}/comment/place/${placeId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`}
            }
        );
    }

    static async createComment({placeId, content}: CreateCommentDTO): Promise<AxiosResponse<CommentDTO>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return axios.post<CommentDTO>(`${Service.serverHost}/comment`,{placeId, content},
            {
                headers: {
                    Authorization: `Bearer ${token}`}
            }
        );
    }

    static async replyComment(commentId: number, {placeId, content}: CreateCommentDTO): Promise<AxiosResponse<CommentDTO>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return axios.post<CommentDTO>(`${Service.serverHost}/comment/reply/${commentId}`,{placeId, content},
            {
                headers: {
                    Authorization: `Bearer ${token}`}
            }
        );
    }
}