import {UserDTO} from "../models/user/userDTO";
import {IRegisterResponse} from "../models/auth/IRegisterResponse";
import {ILoginResponse} from "../models/auth/ILoginResponse";

export const saveUserDTO = (userResponse: IRegisterResponse | ILoginResponse): UserDTO => {
    const newUser: UserDTO = {} as UserDTO;

    newUser.id = userResponse.id;
    newUser.name = userResponse.name;
    newUser.surname = userResponse.surname;
    newUser.mail = userResponse.mail;

    // newUser = { ...userResponse };

    return newUser;
}