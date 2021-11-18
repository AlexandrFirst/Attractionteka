import React from "react";
import UserProfilePage from "./userProfilePage/userProfilePage";
import UserChangePass from "./userChangePassPage/userChangePass";

export const sideList = [
    "User profile",
    "Attraction visit history",
    "My reviews",
    "Change password",
    "Settings",
    "Log out",
];

export const reactElements: React.ReactElement[] = [
    <UserProfilePage />,
    <></>,
    <></>,
    <UserChangePass />,
    <></>,
    <></>,
];