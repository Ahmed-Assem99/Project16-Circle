import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}:{children:ReactElement}) {

const isUserLoggedIn: boolean = !!localStorage.getItem("token")

  return (
    <div>
        <h1>Protected Route</h1>
        {isUserLoggedIn? children: <Navigate to={"/signin"}/>}
    </div>
  )
}
