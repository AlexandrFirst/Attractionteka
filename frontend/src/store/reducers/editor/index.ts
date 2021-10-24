import {EditorAction, EditorActionsEnum, EditorState} from "./types";

const initialValue: EditorState = {
    photos: {
        data:[],
        isLoading:false,
        error: ''
    },
    audios: {
        data:[],
        isLoading:false,
        error: ''
    },
    videos: {
        data:[],
        isLoading:false,
        error: ''
    },
    keywords: {
        data: [],
        isLoading: false,
        error: ''
    },
    // isLoading: false,
    // error: '',
}

export default function editorReducer(state = initialValue, action: EditorAction): EditorState {
    switch (action.type) {
        case EditorActionsEnum.SET_PHOTOS:
            return { ...state, photos: { ...state.photos, data: [...state.photos.data, action.payload], isLoading: false }  }

        case EditorActionsEnum.SET_AUDIOS:
            return { ...state, audios: { ...state.audios, data: [...state.audios.data, action.payload], isLoading: false } }

        case EditorActionsEnum.DELETE_AUDIO:
            return { ...state, audios: { ...state.audios, data: [...state.audios.data.filter(audio => audio.publicId !== action.payload.publicId)], isLoading: false }  }

        case EditorActionsEnum.SET_VIDEOS:
            return { ...state, videos: { ...state.videos, data: [...state.videos.data, action.payload], isLoading: false } }

        case EditorActionsEnum.SET_KEYWORDS:
            return { ...state, keywords: { ...state.keywords, data: action.payload, isLoading: false } }

        case EditorActionsEnum.SET_IS_LOADING_PHOTOS:
            return { ...state, photos: { ...state.photos, isLoading: action.payload } }

        case EditorActionsEnum.SET_IS_LOADING_VIDEOS:
            return { ...state, videos: { ...state.videos, isLoading: action.payload } }

        case EditorActionsEnum.SET_IS_LOADING_AUDIOS:
            return { ...state, audios: { ...state.audios, isLoading: action.payload } }

        case EditorActionsEnum.SET_ERROR_PHOTOS:
            return { ...state, photos: { ...state.photos, error: action.payload, isLoading: false } }

        case EditorActionsEnum.SET_ERROR_AUDIOS:
            return { ...state, audios: { ...state.audios, error: action.payload, isLoading: false } }

        case EditorActionsEnum.SET_ERROR_VIDEOS:
            return { ...state, videos: { ...state.videos, error: action.payload, isLoading: false } }

        default:
            return state;
    }
}