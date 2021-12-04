import React from "react";
import UserProfilePage from "./userProfilePage/userProfilePage";
import UserChangePass from "./userChangePassPage/userChangePass";
import BlockUsersPage from "../blockUsersPage/blockUsersPage";
import EditUserProfilePage from "./editUserProfilePage/editUserProfilePage";



export const sideList = [
    "User profile",
    "Attraction visit history",
    "My reviews",
    "Change password",
    "Settings",
    "Log out",
    "Block users",
];

export const reactElements: React.ReactElement[] = [
    <UserProfilePage />,
    <></>,
    <></>,
    <UserChangePass />,
    <></>,
    <></>,
    <BlockUsersPage/>,
];