import {IUser} from "../../../models/IUser";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import {UserService} from "../../../services/auth-service";


export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ type:AuthActionsEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type:AuthActionsEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type:AuthActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type:AuthActionsEnum.SET_ERROR, payload }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await UserService.getUsers();
            ///TODO: сделать логин через правильный метод на бекэнде
        } catch (e: any) {
            dispatch(AuthActionCreators.setError(e))
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {


        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    }
}