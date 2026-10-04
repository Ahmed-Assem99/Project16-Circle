import { Avatar, Button } from "@heroui/react";

import { IoSend } from "react-icons/io5";
import type { createCommentI } from "../interfaces/createCommentI";
import { useState } from "react";

/* STYLING NOTES — CreateComment
   - Pill input: rounded-full + bg-default-100, with a primary ring
     when focused (focus-within).
   - The send button sits inside the pill on the right. */

export default function CreateComment({createComment,postId}:{createComment:createCommentI,postId:string}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (content.trim() === "") return;

    const formData = new FormData();
    formData.set("content", content);

    setIsLoading(true);
    try {
      await createComment(postId, formData);
      setContent("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <Avatar name="You" size="sm" className="shrink-0" />

      <div className="flex flex-1 items-center gap-2 rounded-full bg-default-100 py-1 pl-4 pr-1 transition-shadow focus-within:ring-2 focus-within:ring-primary-300">
        <input
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          type="text"
          disabled={isLoading}
          placeholder="Write a comment..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-default-500"
        />

        <Button
          type="submit"
          isIconOnly
          size="sm"
          radius="full"
          variant="light"
          color="primary"
          isLoading={isLoading}
          isDisabled={content.trim() === ""}
          aria-label="Send comment"
        >
          <IoSend />
        </Button>
      </div>
    </form>
  );
}
