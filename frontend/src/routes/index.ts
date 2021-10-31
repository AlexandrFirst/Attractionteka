import MainPage from "../pages/mainPage/mainPage";
import LoginPage from "../pages/loginPage/loginPage";
import EditPage from "../pages/editPage/editPage";
import AttractionPage from "../pages/attractionPage/attractionPage";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    MAIN = "/",
    LOGIN = "/login",
    EDIT = "/edit",
    ATTRACTION="/attraction",
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: MainPage, exact: true },
    { path: RouteNames.LOGIN, component: LoginPage, exact: true },
    { path: RouteNames.EDIT, component: EditPage, exact: true },
    { path: RouteNames.ATTRACTION + "/:id", component: AttractionPage, exact: true },
]

// export const privateRoutes: IRoute[] = [
//     ...publicRoutes,
//     { path: RouteNames.UPLOADTRACK, component: UploadTrack, exact: true },
// ]