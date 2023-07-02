import {SetErrorAction, SetIsLoadingAction, SetUserDataAction, UserActionsEnum} from "./types";
import {UserDTO} from "../../../models/user/userDTO";
import {AppDispatch} from "../../index";
import {PlaceService} from "../../../services/place-service";
import {UserService} from "../../../services/user-service";
import {UpdatePasswordDto} from "../../../models/user/updatePasswordDto";


export const UserActionCreators = {

    setIsLoadingUserData: (payload: boolean): SetIsLoadingAction => ({ type:UserActionsEnum.SET_IS_LOADING, payload }),
    setErrorUserData: (payload: string): SetErrorAction => ({ type:UserActionsEnum.SET_ERROR, payload }),
    setUserData: (payload: UserDTO): SetUserDataAction => ({ type: UserActionsEnum.SET_USER_DATA, payload }),

    updateUserInfo: (user: UserDTO) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoadingUserData(true));
            const response = await UserService.updateUserInfo(user);
            dispatch(UserActionCreators.setUserData(response.data));
            console.log(response.data);
        } catch (e: any) {
            dispatch(UserActionCreators.setErrorUserData("Обновлении данных произошла ошибка"))
        } finally {
            dispatch(UserActionCreators.setIsLoadingUserData(false))
        }
    },

    updateUserPassword: (passwords: UpdatePasswordDto, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoadingUserData(true));
            console.log("token... I AM SENDING", token)
            const response = await UserService.updateUserPassword(passwords, token);
            // dispatch(UserActionCreators.setUserData(response.data));
            console.log(response.data);
        } catch (e: any) {
            dispatch(UserActionCreators.setErrorUserData("Обновлении данных произошла ошибка"))
        } finally {
            dispatch(UserActionCreators.setIsLoadingUserData(false))
        }
    },

    banUser: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoadingUserData(true));
            console.log("updateUserPassword... I AM SENDING", id)
            const response = await UserService.banUser(id);
            // dispatch(UserActionCreators.setUserData(response.data));
            console.log(response.data);
        } catch (e: any) {
            dispatch(UserActionCreators.setErrorUserData("Обновлении данных произошла ошибка"))
        } finally {
            dispatch(UserActionCreators.setIsLoadingUserData(false))
        }
    },
}