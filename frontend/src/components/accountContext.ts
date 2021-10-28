import { createContext } from "react";
import {IAccountContext} from "../models/auth/IAccountContext";

export const AccountContext = createContext({} as IAccountContext);