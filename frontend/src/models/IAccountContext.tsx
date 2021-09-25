import React from "react";

export interface IAccountContext {
    switchToRegister: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    switchToLogin: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}