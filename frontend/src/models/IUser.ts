export interface IUser {
    id: number
    name: string;
    surname: string;
    mail: string;
    password: string;
    //Должен принимать роль пользователя. Правильно? -> Правильно!
}