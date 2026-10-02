import { Link } from "react-router-dom";

/* STYLING NOTES — NotFound (404)
   - Everything is centered in a column (flex-col + items-center + text-center).
   - "404" is huge and brand-colored so it's the first thing you see; the
     title and explanation get smaller and lighter step by step.
   - The "Back to feed" link uses the same pill-button style as the
     navbar's "Sign Up", so buttons look the same everywhere. */
export default function NotFound() {
  return (
    // py-24 → lots of vertical space so the message sits in the middle of the page
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      {/* text-7xl font-extrabold text-primary → big bold brand-colored number */}
      <p className="text-7xl font-extrabold tracking-tight text-primary">404</p>
      <h1 className="text-2xl font-bold">Page not found</h1>
      {/* max-w-sm → keeps the sentence short per line, easier to read */}
      <p className="max-w-sm text-sm text-default-500">
        The page you're looking for doesn't exist or was moved.
      </p>
      {/* mt-3 → extra space before the button */}
      <Link
        to="/"
        className="mt-3 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to feed
      </Link>
    </div>
  );
}
