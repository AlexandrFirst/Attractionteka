import {AuthAction, AuthActionsEnum, AuthState} from "./types";


const initialValue: AuthState = {
    isAuth: false
}

export default function authReducer(state = initialValue, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionsEnum.SET_AUTH:
            return { ...state, isAuth: action.payload }
        default:
            return state;
    }
}
