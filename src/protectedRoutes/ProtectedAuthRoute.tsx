import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedAuthRoute({children}:{children:ReactElement}) {
    const isUserLoggedIn:boolean=!! localStorage.getItem("token")
  return (
      <div>
      {isUserLoggedIn ? <Navigate to={"/"}/> : children}
      </div>
    )
}
