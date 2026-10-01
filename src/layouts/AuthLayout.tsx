import { Outlet } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { useContext } from "react";

export default function AuthLayout() {
  const {isLoading}= useContext(authContext)
  return ( isLoading?<h1>Loading</h1>:<div className="flex justify-center items-center min-h-screen bg-linear-to-bl from-blue-400 to-gray-400">
      <div className="border rounded-2xl p-6 min-w-xl bg-white/40">
        <Outlet />
      </div>
    </div>
  );
}
