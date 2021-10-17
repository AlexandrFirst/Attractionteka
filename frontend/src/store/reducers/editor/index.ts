import {EditorAction, EditorActionsEnum, EditorState} from "./types";

const initialValue: EditorState = {
    media: null,
    isLoading: false,
    error: '',
}

export default function editorReducer(state = initialValue, action: EditorAction): EditorState {
    switch (action.type) {
        case EditorActionsEnum.SET_MEDIA:
            return { ...state, media: action.payload, isLoading: false }

        case EditorActionsEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }

        case EditorActionsEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        default:
            return state;
    }
}