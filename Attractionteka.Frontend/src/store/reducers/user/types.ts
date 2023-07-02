import {UserDTO} from "../../../models/user/userDTO";

export interface UserState {
    isLoading: boolean;
    userData: UserDTO;
    error: string;
}

export enum UserActionsEnum {
    SET_IS_LOADING="SET_LOADING",
    SET_ERROR="SET_ERROR",
    SET_USER_DATA="SET_USER_DATA",
}

export interface SetUserDataAction {
    type: UserActionsEnum.SET_USER_DATA;
    payload: UserDTO;
}

export interface SetIsLoadingAction {
    type: UserActionsEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: UserActionsEnum.SET_ERROR;
    payload: string;
}

export type UserAction =
    SetUserDataAction |
    SetIsLoadingAction |
    SetErrorAction;