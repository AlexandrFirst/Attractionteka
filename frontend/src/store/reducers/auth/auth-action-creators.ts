import {IUser} from "../../../models/IUser";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import {AuthService} from "../../../services/auth-service";
import {AuthData} from "../../../models/AuthData";


export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ type:AuthActionsEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type:AuthActionsEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type:AuthActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type:AuthActionsEnum.SET_ERROR, payload }),
    login: (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await AuthService.login(email, password);
            localStorage.setItem(AuthData.token, response.data.token);
            AuthActionCreators.setIsAuth(true);
                // .then(res => localStorage.setItem(AuthData.token, res.data.token));
            // localStorage.setItem(AuthData.token, response.data.token);
            ///TODO: сделать логин через правильный метод на бекэнде
        } catch (e: any) {
            dispatch(AuthActionCreators.setError(e))
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    registration: (name:string, surname: string, email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await AuthService.registration(name, surname, email, password);
            localStorage.setItem(AuthData.token, response.data.token);
            AuthActionCreators.setIsAuth(true);
            // .then(res => localStorage.setItem(AuthData.token, res.data.token));

        } catch (e: any) {
            dispatch(AuthActionCreators.setError(e))
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        await AuthService.logout();

        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    }
}