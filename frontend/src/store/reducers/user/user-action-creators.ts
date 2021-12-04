import {SetErrorAction, SetIsLoadingAction, SetUserDataAction, UserActionsEnum} from "./types";
import {UserDTO} from "../../../models/user/userDTO";


export const UserActionCreators = {

    setIsLoadingUserData: (payload: boolean): SetIsLoadingAction => ({ type:UserActionsEnum.SET_IS_LOADING, payload }),
    setErrorUserData: (payload: string): SetErrorAction => ({ type:UserActionsEnum.SET_ERROR, payload }),
    setUserData: (payload: UserDTO): SetUserDataAction => ({ type: UserActionsEnum.SET_USER_DATA, payload }),
}