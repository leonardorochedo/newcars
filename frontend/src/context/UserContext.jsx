import { createContext } from "react";

import { useAuth } from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {

    const { authenticated, register, login, deleteUser, editUser, logout } = useAuth()

    return (
        <Context.Provider value={{ authenticated, register, login, deleteUser, editUser, logout }}>
            {children}
        </Context.Provider>
    )
}

export {Context, UserProvider}