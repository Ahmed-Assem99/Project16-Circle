import { createContext, useState, type ReactElement } from "react";

export const authContext=createContext<any>({})

export default function AuthContextProvider({children}:{children:ReactElement}){

const [isLoggedIn, setisLoggedIn] = useState(!! localStorage.getItem("token"))
    return (
        <authContext.Provider value={{isLoggedIn,setisLoggedIn}}>
        {children}
        </authContext.Provider>
    )
}