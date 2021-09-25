import React from "react";

export interface IAccountContext {
    switchToRegister: (e: React.MouseEvent<HTMLDivElement>) => void;
    switchToLogin: (e: React.MouseEvent<HTMLDivElement>) => void;
}