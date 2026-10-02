import type { PostI } from "../interfaces/postI";
import { Avatar, Button, Divider } from "@heroui/react";
import { FaEllipsisH, FaRegComment, FaRegHeart, FaShare, FaTrash } from "react-icons/fa";
import Comment from "./Comment";
import { useContext } from "react";
import { authContext } from "../contexts/authContext";


export default function Post({ post, deletePost }: { post: PostI,deletePost:any }) {
  const {userData} = useContext(authContext)
  return (
    <article className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm dark:bg-default-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
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
<div className="flex content-center items-center">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          aria-label="Post options"
        >
          <FaEllipsisH className="text-default-500" />
        </Button>
{post.user._id== userData._id   &&    <FaTrash onClick={()=>deletePost(post._id)} className="text-red-500 cursor-pointer"/>}
        </div>
      </div>

      {/* Post text */}
      {post.body && (
        <div className="px-4 pb-4">
          <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
            {post.body}
          </p>
        </div>
      )}

      {/* Post image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="block max-h-[600px] w-full object-cover"
        />
      )}

      {/* Engagement */}
      <div className="flex items-center justify-between px-4 py-3 text-xs text-default-500">
        <span>❤️ {post.likesCount}</span>
        <span>{post.commentsCount} comments</span>
      </div>

      <Divider />

      {/* Actions */}
      <div className="grid grid-cols-3 gap-1 p-1 ">
        <Button
          variant="light"
          radius="lg"
          className="font-medium text-default-600"
          startContent={<FaRegHeart />}
        >
          Like
        </Button>

        <Button
          variant="light"
          radius="lg"
          className="font-medium text-default-600"
          startContent={<FaRegComment />}
        >
          Comment
        </Button>

        <Button
          variant="light"
          radius="lg"
          className="font-medium text-default-600"
          startContent={<FaShare />}
        >
          Share
        </Button>
      </div>

      {post.topComment && <Comment comment={post.topComment}></Comment>}
    </article>
  );
}
