import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-bl from-blue-400 to-gray-400">
      <div className="border rounded-2xl p-6 min-w-xl bg-white/40">
        <Outlet />
      </div>
    </div>
  );
}
