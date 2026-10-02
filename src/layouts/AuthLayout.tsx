import { Link, Outlet } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { useContext } from "react";
import { Spinner } from "@heroui/react";

/* STYLING NOTES — AuthLayout (wraps SignIn & SignUp)
   - Full-screen soft gradient background with two big blurred "blobs"
     behind the card for depth (pure decoration).
   - The card is "glass": a semi-transparent surface + backdrop-blur.
   - Width: `w-full max-w-md` instead of the old `min-w-xl`.
     min-w-xl forced 576px, which overflowed on phones; now it fills the
     screen on mobile and stops growing at 448px on bigger screens. */
export default function AuthLayout() {
  const {isLoading}= useContext(authContext)
  return ( isLoading?
    // Loading state: a centered spinner instead of a plain <h1>Loading</h1>
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" />
    </div>
    :
    // relative + overflow-hidden → lets the blurred blobs sit behind the card
    // without creating horizontal scroll.
    // bg-linear-to-br from → via → to → diagonal gradient using theme colors.
    // px-4 py-10 → breathing room on small screens.
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-primary-100 via-default-50 to-secondary-100 px-4 py-10">
      {/* Decorative blobs: absolute-positioned circles, heavily blurred.
          pointer-events-none so they never block clicks. */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary-300/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-secondary-300/40 blur-3xl" />

      {/* relative → stays above the blobs | w-full max-w-md → responsive width */}
      <div className="relative w-full max-w-md">
        {/* Brand: a ring (a literal "circle") + the app name */}
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="size-8 rounded-full border-[6px] border-primary" />
          <span className="text-2xl font-extrabold tracking-tight">Circle</span>
        </Link>

        {/* Glass card:
            bg-content1/70 → 70% opaque surface | backdrop-blur-xl → frosted glass
            border-white/40 → light edge highlight | shadow-xl → floating feel
            p-6 sm:p-8 → more padding once the screen is ≥ 640px */}
        <div className="rounded-2xl border border-white/40 bg-content1/70 p-6 shadow-xl backdrop-blur-xl sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
