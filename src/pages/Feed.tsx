import { useEffect, useState } from "react";
import postsService from "../services/postsService";
import type { PostI } from "../interfaces/postI";
import type { createCommentI } from "../interfaces/createCommentI";
import type { editCommentI } from "../interfaces/editCommentI";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import commentsServices from "../services/commentsService";
import type { GetPostsResponse, Response } from "../types/Response";

export default function Feed() {
  const [Posts, setPosts] = useState<PostI[]>([]);
  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts():Promise<GetPostsResponse> {
    const { data } = await postsService.getAllPosts();
    setPosts(data.posts);
    return data
  }

  async function deletePost(postId:string){
await postsService.deletePost(postId)
getAllPosts()
  }

  const createComment: createCommentI = async (postId, formData) => {
    await commentsServices.createComment(postId, formData)
    getAllPosts()
  }

  const editComment: editCommentI = async (postId, commentId, formData) => {
    await commentsServices.editComment(postId, commentId, formData)
    getAllPosts()
  }

async function deleteComment(postId:string,commentId:string):Promise<Response<{}>>{
  const response = await commentsServices.deleteComment(postId,commentId)
  getAllPosts()
  return response
}

  /* STYLING NOTES — Feed
     - Removed the fixed widths (`w-4xl` around CreatePost, `w-3xl` around
       each Post). They made CreatePost and the posts different widths and
       broke the layout on phones. Width now comes from MainLayout
       (max-w-2xl), so everything lines up in one clean column.
     - One vertical stack with `gap-4` spaces ALL cards equally,
       including CreatePost (so its old `mb-5` is no longer needed). */
  return (
    // flex-col + gap-4 → cards stacked vertically, 16px apart
    <div className="flex flex-col gap-4">
      <CreatePost getAllPosts={getAllPosts}></CreatePost>

      {/* key → React needs a unique key for each item in a list */}
      {Posts.map((post) => (
        <Post key={post._id} post={post} deletePost={deletePost} createComment={createComment} deleteComment={deleteComment} editComment={editComment}></Post>
      ))}
    </div>
  );
}
