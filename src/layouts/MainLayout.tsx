import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { authContext } from "../contexts/authContext";
import { Spinner } from "@heroui/react";

/* STYLING NOTES — MainLayout (wraps Feed, Profile, NotFound)
   - This is the ONLY place that decides how wide the page content is.
     Pages/components just fill the space they get (w-full) instead of
     setting their own fixed widths.
   - max-w-2xl (672px) is a comfortable reading width for a social feed,
     the same idea Facebook/Twitter use for their center column. */
export default function MainLayout() {
  const {isLoading}= useContext(authContext)
  return (
    isLoading?(
      // Centered spinner for the initial auth check
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    ):
    // min-h-screen → the page background always fills the viewport
    (<div className="min-h-screen">
      <Navbar />
      {/* mx-auto        → centers the column
          w-full max-w-2xl → full width on phones, capped at 672px on desktop
          px-4 py-6      → side gutter so cards never touch the screen edge */}
      <main className="mx-auto w-full max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>)
  );
}
