import { Avatar } from "@heroui/react";
import type { PostI } from "../interfaces/postI";

interface CommentProps {
  post: PostI;
}

export default function Comment({ post }: CommentProps) {
  return (
    <div className="border-t border-default-200 px-4 py-4">
      {/* Comment input */}
      <div className="flex items-center gap-3">
        <Avatar name="You" size="sm" className="shrink-0" />

        <div className="flex flex-1 items-center rounded-full bg-default-100 px-4 py-2">
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
          src={post.topComment?.commentCreator.photo}
          name={post.topComment?.commentCreator.name}
          size="sm"
          className="shrink-0"
        />

        <div>
          <div className="rounded-2xl bg-default-100 px-4 py-2">
            <p className="text-sm font-semibold text-foreground">
              {post.topComment?.commentCreator.name}
            </p>

            <p className="text-sm text-default-700">
              {post.topComment?.content}
            </p>
          </div>

          <div className="mt-1 flex gap-4 px-3 text-xs font-medium text-default-500">
            <button className="hover:text-foreground">Like</button>

            <button className="hover:text-foreground">Reply</button>

            <span>{post.topComment?.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
