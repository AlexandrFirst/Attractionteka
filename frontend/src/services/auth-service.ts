import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";


export class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {

        return axios.get<IUser[]>('./users.json')
    }
}