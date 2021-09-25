import Main from "../pages/main/main";
import LoginPage from "../pages/loginPage/loginPage";
import RegisterPage from "../pages/registerPage/registerPage";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    MAIN = "/",
    LOGIN = "/login",
    // REGISTER = "/register",
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: Main, exact: true },
    { path: RouteNames.LOGIN, component: LoginPage, exact: true },
    // { path: RouteNames.REGISTER, component: RegisterPage, exact: true },
]

// export const privateRoutes: IRoute[] = [
//     ...publicRoutes,
//     { path: RouteNames.UPLOADTRACK, component: UploadTrack, exact: true },
// ]