import {UserDTO} from "../user/userDTO";
import {IPlaceResponse} from "../place/IPlaceResponse";


export interface CommentDTO {
    id: number;
    content: string;
    author: UserDTO;
    commentTime: Date;
    place: IPlaceResponse;
    commentReplies: CommentDTO[];
    parentComment: CommentDTO;
}