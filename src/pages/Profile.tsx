
/* STYLING NOTES — Profile (placeholder for now)
   - Wrapped in the shared `card` utility so it already matches the feed.
   - Removed `underline` from the heading: underline usually means
     "this is a link", so it's confusing on a title. */
export default function Profile() {
  return (
    // card p-6 → same card look as posts, with roomy padding
    <section className="card p-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
    </section>
  );
}
