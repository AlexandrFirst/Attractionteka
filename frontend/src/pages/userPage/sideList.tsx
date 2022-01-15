import React from "react";
import UserProfilePage from "./userProfilePage/userProfilePage";
import UserChangePass from "./userChangePassPage/userChangePass";
import BlockUsersPage from "../blockUsersPage/blockUsersPage";
import EditUserProfilePage from "./editUserProfilePage/editUserProfilePage";
import VisitHistory from "../visitHistory/VisitHistory";




export const sideList = [
    "User profile",
    "Attraction visit history",
    "Change password",
    "Block users",
];

export const reactElements: React.ReactElement[] = [
    <UserProfilePage />,
    <VisitHistory />,
    <UserChangePass />,
    <BlockUsersPage/>,
];