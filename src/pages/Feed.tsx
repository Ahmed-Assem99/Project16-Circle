import { useEffect, useState } from "react";
import postsService from "../services/postsService";
import type { PostI } from "../interfaces/postI";
import type { createCommentI } from "../interfaces/createCommentI";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import commentsServices from "../services/commentsService";

export default function Feed() {
  const [Posts, setPosts] = useState<PostI[]>([]);
  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    const { data } = await postsService.getAllPosts();
    setPosts(data.posts);
  }

  async function deletePost(postId:string){
await postsService.deletePost(postId)
getAllPosts()
  }

  const createComment: createCommentI = async (postId, formData) => {
    await commentsServices.createComment(postId, formData)
    getAllPosts()
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
        <Post key={post._id} post={post} deletePost={deletePost} createComment={createComment}></Post>
      ))}
    </div>
  );
}
