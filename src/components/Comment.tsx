import { Avatar } from "@heroui/react";

import type { CommentI } from "../interfaces/commentI";

/* STYLING NOTES — Comment section (bottom part of a Post card)
   - border-t border-divider separates comments from the action buttons.
   - Comments use "bubbles": rounded-2xl + bg-default-100, a slightly
     darker grey than the card, so they read as nested inside the post.
   - The comment input is a pill (rounded-full) that shows a primary
     ring when focused, so the user sees where they're typing. */
export default function Comment({ comment }: { comment: CommentI }) {
  return (
    <div className="border-t border-divider px-4 py-4">
      {/* Comment input */}
      <div className="flex items-center gap-3">
        <Avatar name="You" size="sm" className="shrink-0" />

        {/* focus-within: → styles applied when the <input> inside is focused
            ring-2 ring-primary-300 → soft brand-colored outline
            transition-shadow → the ring fades in instead of popping */}
        <div className="flex flex-1 items-center rounded-full bg-default-100 px-4 py-2 transition-shadow focus-within:ring-2 focus-within:ring-primary-300">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-default-500"
          />
        </div>
      </div>

      {/* Example comment */}
      <div className="mt-4 flex items-start gap-3">
        <Avatar
          src={comment.commentCreator.photo}
          name={comment.commentCreator.name}
          size="sm"
          className="shrink-0"
        />

        {/* min-w-0 → lets long comments wrap inside the flex row */}
        <div className="min-w-0">
          {/* The bubble: grey rounded background around name + text */}
          <div className="rounded-2xl bg-default-100 px-4 py-2">
            <p className="text-sm font-semibold text-foreground">
              {comment.commentCreator.name}
            </p>

            <p className="wrap-break-word text-sm text-default-700">{comment.content}</p>
          </div>

          {/* Small muted actions under the bubble.
              px-3 → aligns them with the text inside the bubble
              hover:text-primary → turns brand-colored on hover */}
          <div className="mt-1 flex gap-4 px-3 text-xs font-medium text-default-500">
            <button className="transition-colors hover:text-primary">Like</button>

            <button className="transition-colors hover:text-primary">Reply</button>

            {/* font-normal → the date is info, not an action, so it's lighter */}
            <span className="font-normal">{comment.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
