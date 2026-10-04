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
    // isolate → makes this div its own stacking context, so the -z-10
    //           background layer stays behind the content but above <body>
    (<div className="relative isolate min-h-screen">
      {/* Decorative background (styling only, no content).
          fixed inset-0 → covers the viewport and stays put while scrolling
          pointer-events-none → never blocks clicks
          Layers, bottom to top:
            1. soft vertical gradient: default-50 → default-100 (page tone)
            2. faint dot grid in the brand color (the radial-gradient)
            3. two blurred brand-colored glows, one on each side; they are
               hidden below lg because phones have no side space to show them */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-linear-to-b from-default-50 to-default-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--heroui-primary)/0.18)_1px,transparent_1px)] bg-size-[22px_22px] mask-[linear-gradient(to_bottom,black,transparent_85%)]" />

        <div className="absolute -left-40 top-24 hidden size-96 rounded-full bg-primary/15 blur-3xl lg:block" />
        <div className="absolute -right-40 top-1/2 hidden size-96 rounded-full bg-secondary/15 blur-3xl lg:block" />
      </div>

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
