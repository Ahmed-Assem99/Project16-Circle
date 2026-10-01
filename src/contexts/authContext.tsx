import { createContext, useEffect, useState, type ReactElement } from "react";
import { authServices } from "../services/authService";

export const authContext = createContext<any>({});

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
const [userData, setUserData] = useState()
const [isLoading, setisLoading] = useState(true)

  async function getUserData() {
      try {
          const {data} = await authServices.getUserData();
          setUserData(data.user)
          setisLoggedIn(true)
          setisLoading(false)
        } catch (error) {
            setisLoggedIn(false)
            localStorage.removeItem("token")
            setisLoading(false)
}
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }else{
        setisLoading(false)
    }
  }, [isLoggedIn]);

  return (
    <authContext.Provider value={{isLoggedIn, setisLoggedIn,isLoading,userData}}>
      {children}
    </authContext.Provider>
  );
}
