import MainPage from "../pages/mainPage/mainPage";
import LoginPage from "../pages/loginPage/loginPage";
import EditPage from "../pages/editPage/editPage";
import AttractionPage from "../pages/attractionPage/attractionPage";
import UserPage from "../pages/userPage/userPage";
import BlockUsersPage from "../pages/blockUsersPage/blockUsersPage";
import FilteredPlacesPage from "../pages/filteredPlacesPage/filteredPlacesPage";
import PgError from "../pages/pgError/PgError";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    MAIN = "/",
    LOGIN = "/login",
    ERROR = "/error",
    EDIT = "/edit",
    ATTRACTION="/attraction",
    USER="/user",
    BLOCK_USERS="/block_users",
    FILTERED_PLACES="/filtered_places",
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: MainPage, exact: true },
    { path: RouteNames.LOGIN, component: LoginPage, exact: true },
    { path: RouteNames.ERROR, component: PgError, exact: true },
    { path: RouteNames.EDIT, component: EditPage, exact: true },
    { path: RouteNames.ATTRACTION + "/:id", component: AttractionPage, exact: true },
    { path: RouteNames.USER + "/:id", component: UserPage, exact: true },
    { path: RouteNames.BLOCK_USERS, component: BlockUsersPage, exact: true },
    { path: RouteNames.FILTERED_PLACES, component: FilteredPlacesPage, exact: true },
]

// export const privateRoutes: IRoute[] = [
//     ...publicRoutes,
//     { path: RouteNames.UPLOADTRACK, component: UploadTrack, exact: true },
// ]