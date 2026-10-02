import type { PostI } from "../interfaces/postI";
import { Avatar, Button, Divider } from "@heroui/react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart, FaShare, FaTrash } from "react-icons/fa";
import Comment from "./Comment";
import { useContext } from "react";
import { authContext } from "../contexts/authContext";


export default function Post({ post, deletePost }: { post: PostI,deletePost:any }) {
  const {userData} = useContext(authContext)
  /* STYLING NOTES — Post card
     - The card look comes from the shared `card` utility (index.css).
       `overflow-hidden` clips the image to the card's rounded corners.
     - Every section uses the same side padding (px-4) so the avatar,
       text, stats and buttons all line up on one vertical edge.
     - Text hierarchy: name = semibold/foreground, time = xs/muted,
       body = regular. Size + color show importance, so no extra decoration
       is needed.
     - Each action button gets its own hover color (like = red,
       comment = blue, share = green) as a small hint of what it does. */
  return (
    <article className="card overflow-hidden">
      {/* Header: author on the left, actions on the right */}
      <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4">
        {/* min-w-0 → allows `truncate` to work on long names inside flex */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            src={post.user.photo}
            name={post.user.name}
            size="md"
            className="shrink-0"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {post.user.name}
            </h3>

            <p className="text-xs text-default-500">{post.createdAt}</p>
          </div>
        </div>
        {/* shrink-0 → the buttons never get squeezed by a long name */}
        <div className="flex shrink-0 items-center gap-1">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          radius="full"
          aria-label="Post options"
        >
          <FaEllipsisH className="text-default-500" />
        </Button>
        {/* Delete is now a real round icon button (same size as "options")
            with a red hover background, instead of a bare icon. */}
        {post.user._id== userData._id   &&   (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            radius="full"
            color="danger"
            aria-label="Delete post"
            onPress={()=>deletePost(post._id)}
          >
            <FaTrash />
          </Button>
        )}
        </div>
      </div>

      {/* Post text */}
      {post.body && (
        <div className="px-4 pb-3">
          {/* whitespace-pre-wrap → keeps the line breaks the user typed
              wrap-break-word → long links/words wrap instead of overflowing */}
          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-foreground">
            {post.body}
          </p>
        </div>
      )}

      {/* Post image */}
      {post.image && (
        // border-y → thin lines above/below the image to frame it
        // max-h-150 (600px) + object-cover → very tall images get cropped, not stretched
        // bg-default-100 → grey placeholder while the image loads
        <img
          src={post.image}
          alt="Post"
          className="block max-h-150 w-full border-y border-divider bg-default-100 object-cover"
        />
      )}

      {/* Engagement */}
      <div className="flex items-center justify-between px-4 py-2.5 text-xs text-default-500">
        {/* Small red "like bubble" (like Facebook's reaction icon) */}
        <span className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-danger text-[10px] text-white">
            <FaHeart />
          </span>
          {post.likesCount}
        </span>
        <span>{post.commentsCount} comments</span>
      </div>

      {/* mx-4 → divider is inset to align with the content */}
      <Divider className="mx-4 w-auto" />

      {/* Actions: 3 equal columns, one per button */}
      <div className="grid grid-cols-3 gap-1 p-1">
        <Button
          variant="light"
          radius="lg"
          className="font-medium text-default-600 hover:text-danger"
          startContent={<FaRegHeart />}
        >
          Like
        </Button>

        <Button
          variant="light"
          radius="lg"
          className="font-medium text-default-600 hover:text-primary"
          startContent={<FaRegComment />}
        >
          Comment
        </Button>

        <Button
          variant="light"
          radius="lg"
          className="font-medium text-default-600 hover:text-success"
          startContent={<FaShare />}
        >
          Share
        </Button>
      </div>

      {post.topComment && <Comment comment={post.topComment}></Comment>}
    </article>
  );
}
