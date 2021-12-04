import {CommentsAction, CommentsActionType, CommentsState} from "./types";

const initialValue: CommentsState = {
    data: [],
    isLoading: false,
    error: '',

}

export default function commentsReducer(state = initialValue, action: CommentsActionType): CommentsState {
    switch (action.type) {

        case CommentsAction.SET_COMMENTS:
            return { ...state, data: action.payload, isLoading: false }

        case CommentsAction.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }

        case CommentsAction.SET_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}