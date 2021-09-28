import axios, {AxiosResponse} from "axios";
    import {ILoginResponse} from "../models/ILoginResponse";
import {IRegisterResponse} from "../models/IRegisterResponse";

require("dotenv").config();

export class AuthService {
    // static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    //
    //     return axios.get<IUser[]>('./users.json',
    //         {headers:
    //                 {Authorization: `Bearer ${localStorage.getItem(AuthData.token)}`}
    //         })
    // }

    static async login(UserMail: string, UserPassword: string): Promise<AxiosResponse<ILoginResponse>> {
        const serverHost = process.env.DEVELOPMENT_SERVER_HOST || "//localhost:5000";
        return axios.post<ILoginResponse>(`${serverHost}/Auth/nativeLogin`,{UserMail, UserPassword}
            // {headers:
            //         {Authorization: `Bearer ${localStorage.getItem(AuthData.token)}`}}
        );
    }

    static async registration(Name: string, Surname: string, Mail: string, Password: string): Promise<AxiosResponse<IRegisterResponse>> {
        const serverHost = process.env.DEVELOPMENT_SERVER_HOST || "//localhost:5000";
        const body = {
            Name: Name,
            Surname: Surname,
            Mail: Mail,
            Password: Password
        }
        return axios.post<IRegisterResponse>(`${serverHost}/Auth/nativeRegister`,
            body
            // {headers:
            //         {Authorization: `Bearer ${localStorage.getItem(AuthData.token)}`}
        );
    }

    static async logout(): Promise<void> {
        return axios.post('SOME URL');
    }
}