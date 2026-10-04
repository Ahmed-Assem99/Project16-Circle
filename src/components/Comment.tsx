import { Avatar } from "@heroui/react";

import type { CommentI } from "../interfaces/commentI";

/* STYLING NOTES — Comment (a single comment inside a Post's comments section)
   - Comments use "bubbles": rounded-2xl + bg-default-100, a slightly
     darker grey than the card, so they read as nested inside the post.
   - The section wrapper (border-t + padding) and the CreateComment input
     live in Post, so this component only renders the comment itself;
     mt-4 spaces it from the input above. */
export default function Comment({ comment }: { comment: CommentI }) {
  return (
    <>
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
    </>
  );
}
