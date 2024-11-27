import {createContext} from "react";

export const UserContext = createContext({
    userData: null,
    setUserData: () => {
    },
    hasOnboarded: false,
    setHasOnboarded: () => {
    },
});
