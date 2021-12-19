import {Service} from "./service";
import axios, {AxiosResponse} from "axios";
import {IPlaceResponse} from "../models/place/IPlaceResponse";
import {UserDTO} from "../models/user/userDTO";
import {LocalStorageKey} from "../types/LocalStorageKey";
import {UpdatePasswordDto} from "../models/user/updatePasswordDto";
import {IVisitHistory} from "../models/user/IVisitHistory";


export class UserService extends Service {

    // static async getUser(id: number):Promise<AxiosResponse<UserDTO>> {
    //
    // }

    static async updateUserInfo(user: UserDTO):Promise<AxiosResponse<UserDTO>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return axios.post<UserDTO>(`${Service.serverHost}/user/user/update/${user.id}`,
            user,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    }

    static async updateUserPassword(passwords: UpdatePasswordDto, token: string):Promise<AxiosResponse<UserDTO>> {
        const curUserToken = localStorage.getItem(LocalStorageKey.token);
        return axios.put<UserDTO>(`${Service.serverHost}/user/password/update/${token}`,
            passwords,
            {
                headers: {
                    Authorization: `Bearer ${curUserToken}`,
                }
            });
    }

    static async banUser(id: number):Promise<AxiosResponse<UserDTO>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return axios.delete<UserDTO>(`${Service.serverHost}/user/user/ban/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    }

    static async getUserMarkOfPlace(placeId: number):Promise<AxiosResponse<{mark: number}>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return await axios.get<{mark: number}>(`${Service.serverHost}/user/place/${placeId}/mark`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    static async getHistory():Promise<AxiosResponse<IVisitHistory[]>> {
        const token = localStorage.getItem(LocalStorageKey.token);
        return await axios.get<IVisitHistory[]>(`${Service.serverHost}/user/history`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
}