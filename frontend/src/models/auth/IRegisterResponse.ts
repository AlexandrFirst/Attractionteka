
export interface IRegisterResponse {
    id: number;
    mail: string;
    name: string;
    surname: string;
    password: string;
    placeDescription: object; //TODO: разобраться с типом описания места (и почему оно тут???)
    role: string;
}