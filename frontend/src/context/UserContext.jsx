import { createContext } from "react";

import { useAuth } from "../hooks/useAuth"

const UserContext = createContext()

function UserProvider({ children }) {

    const { authenticated, register, login, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}