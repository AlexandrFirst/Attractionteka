import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {AuthData} from "../models/AuthData";
import {IAuthResponse} from "../models/IAuthResponse";


export class UserService {
    // static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    //
    //     return axios.get<IUser[]>('./users.json',
    //         {headers:
    //                 {Authorization: `Bearer ${localStorage.getItem(AuthData.token)}`}
    //         })
    // }

    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return axios.get<IAuthResponse>('SOME PATH',
            {headers:
                    {Authorization: `Bearer ${localStorage.getItem(AuthData.token)}`}
        })
    }

    static async registration(name: string, surname: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return axios.post<IAuthResponse>('SOME PATH',
            {name, surname, email, password}
            // {headers:
            //         {Authorization: `Bearer ${localStorage.getItem(AuthData.token)}`}
        )
    }

    static async logout(): Promise<void> {
        return axios.post('SOME URL');
    }
}