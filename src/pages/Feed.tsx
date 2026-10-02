import { useEffect, useState } from "react";
import postsService from "../services/postsService";
import type { PostI } from "../interfaces/postI";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

export default function Feed() {
  const [Posts, setPosts] = useState<PostI[]>([]);
  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    const { data } = await postsService.getAllPosts();
    setPosts(data.posts);
  }
  return (
    <div>
<div className="w-4xl m-auto">
      <CreatePost></CreatePost>
</div>
      <div className="grid gap-4">
        {Posts.map((post) => (
          <div className="w-3xl m-auto">
<Post post={post}></Post>
          </div>)
        )}
      </div>
    </div>
  );
}
