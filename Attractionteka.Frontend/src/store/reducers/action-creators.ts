import {AuthActionCreators} from "./auth/auth-action-creators";
import {EditorActionCreators} from "./editor/editor-action-creators";
import {PlaceActionCreators} from "./place/place-action-creators";
import {UserActionCreators} from "./user/user-action-creators";
import {CommentsActionCreators} from "./comment/comments-action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EditorActionCreators,
    ...PlaceActionCreators,
    ...UserActionCreators,
    ...CommentsActionCreators,
    
}
