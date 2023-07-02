import {UserAction, UserActionsEnum, UserState} from "./types";
import {UserDTO} from "../../../models/user/userDTO";

const initialState: UserState = {
    isLoading: false,
    userData: {} as UserDTO,
    error: '',
}

export default function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {

        case UserActionsEnum.SET_USER_DATA:
            return { ...state, userData: action.payload, isLoading: false, error: '' }

        case UserActionsEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }

        case UserActionsEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        default:
            return state;
    }
}