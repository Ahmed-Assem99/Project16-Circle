import { Avatar, Button } from "@heroui/react";

import { FaPen, FaTrash } from "react-icons/fa";

import type { CommentI } from "../interfaces/commentI";
import type { editCommentI } from "../interfaces/editCommentI";
import { useContext, useState } from "react";
import { authContext } from "../contexts/authContext";

/* STYLING NOTES — Comment (a single comment inside a Post's comments section)
   - Comments use "bubbles": rounded-2xl + bg-default-100, a slightly
     darker grey than the card, so they read as nested inside the post.
   - The section wrapper (border-t + padding) and the CreateComment input
     live in Post, so this component only renders the comment itself;
     mt-4 spaces it from the input above. */
export default function Comment({ comment, deleteComment, editComment }: { comment: CommentI,deleteComment:any,editComment: editCommentI }) {
  const {userData} = useContext(authContext)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(comment.content)
  const [isLoading, setIsLoading] = useState(false)

  const isOwner = comment.commentCreator._id == userData._id

  function cancelEdit() {
    setContent(comment.content)
    setIsEditing(false)
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (content.trim() === "") return

    const formData = new FormData()
    formData.set("content", content)

    setIsLoading(true)
    try {
      await editComment(comment.post, comment._id, formData)
      setIsEditing(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mt-4 flex items-start gap-3">
        <Avatar
          src={comment.commentCreator.photo}
          name={comment.commentCreator.name}
          size="sm"
          className="shrink-0"
        />

        {/* flex-1 → this column takes the full remaining width, so the trash
                     button can sit at the far right edge of the comment
            min-w-0 → lets long comments wrap inside the flex row */}
        <div className="min-w-0 flex-1">
          {/* Bubble + trash button side by side.
              items-start → the button lines up with the top of the bubble
              justify-between → bubble on the left, button pushed to the right */}
          <div className="flex items-start justify-between gap-2">
            {isEditing ? (
              // Edit mode: same pill style as CreateComment, with Save / Cancel under it
              <form onSubmit={handleEdit} className="min-w-0 flex-1">
                <input
                  autoFocus
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-full bg-default-100 px-4 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary-300"
                />

                <div className="mt-1 flex gap-2 px-3">
                  <Button
                    type="submit"
                    size="sm"
                    radius="full"
                    color="primary"
                    isLoading={isLoading}
                    isDisabled={content.trim() === ""}
                  >
                    Save
                  </Button>

                  <Button size="sm" radius="full" variant="light" onPress={cancelEdit} isDisabled={isLoading}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              // The bubble: grey rounded background around name + text
              <div className="min-w-0 rounded-2xl bg-default-100 px-4 py-2">
                <p className="text-sm font-semibold text-foreground">
                  {comment.commentCreator.name}
                </p>

                <p className="wrap-break-word text-sm text-default-700">{comment.content}</p>
              </div>
            )}

            {/* Owner-only actions: edit (pencil) + delete (trash), pushed to the right.
                shrink-0 → never squeezed by a long comment. */}
            {isOwner && !isEditing && (
              <div className="flex shrink-0 items-center">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  radius="full"
                  aria-label="Edit comment"
                  onPress={() => setIsEditing(true)}
                >
                  <FaPen />
                </Button>

                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  radius="full"
                  color="danger"
                  aria-label="Delete comment"
                  onPress={() => { deleteComment(comment.post, comment._id) }}
                >
                  <FaTrash />
                </Button>
              </div>
            )}
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
