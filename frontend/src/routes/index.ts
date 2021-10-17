import Main from "../pages/main/main";
import LoginPage from "../pages/loginPage/loginPage";
import EditPage from "../pages/editPage/editPage";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    MAIN = "/",
    LOGIN = "/login",
    EDIT = "/edit",
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: Main, exact: true },
    { path: RouteNames.LOGIN, component: LoginPage, exact: true },
    { path: RouteNames.EDIT, component: EditPage, exact: true },
]

// export const privateRoutes: IRoute[] = [
//     ...publicRoutes,
//     { path: RouteNames.UPLOADTRACK, component: UploadTrack, exact: true },
// ]