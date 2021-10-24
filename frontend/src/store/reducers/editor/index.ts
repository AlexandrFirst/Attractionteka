import {EditorAction, EditorActionsEnum, EditorState} from "./types";

const initialValue: EditorState = {
    photos: [],
    audios: [],
    videos: [],
    keywords: [],
    isLoading: false,
    error: '',
}

export default function editorReducer(state = initialValue, action: EditorAction): EditorState {
    switch (action.type) {
        case EditorActionsEnum.SET_PHOTOS:
            return { ...state, photos: [...state.photos, action.payload], isLoading: false }

        case EditorActionsEnum.SET_AUDIOS:
            return { ...state, audios: [...state.audios, action.payload], isLoading: false }

        case EditorActionsEnum.DELETE_AUDIO:
            return { ...state, audios: [...state.audios.filter(audio => audio.id !== action.payload.id)], isLoading: false }

        case EditorActionsEnum.SET_VIDEOS:
            return { ...state, videos: [...state.videos, action.payload], isLoading: false }

        case EditorActionsEnum.SET_KEYWORDS:
            return { ...state, keywords: action.payload, isLoading: false }

        case EditorActionsEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }

        case EditorActionsEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        default:
            return state;
    }
}