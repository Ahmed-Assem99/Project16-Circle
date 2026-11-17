import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { GetPostCommentsResponse, GetPostDetailsResponse, Response } from "../types/Response";
import postsService from "../services/postsService";
import commentsServices from "../services/commentsService";
import type { PostI } from "../interfaces/postI";
import type { CommentI } from "../interfaces/commentI";
import type { createCommentI } from "../interfaces/createCommentI";
import type { editCommentI } from "../interfaces/editCommentI";
import Post from "../components/Post";

export default function PostDetails() {
  const { postId = "" } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostI>();
  const [comments, setComments] = useState<CommentI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getPostDetails(postId: string): Promise<GetPostDetailsResponse> {
    const response = await postsService.getPostDetails(postId);
    setPost(response.data.post);
    return response;
  }

  async function getPostComments(postId: string): Promise<GetPostCommentsResponse> {
    const response = await commentsServices.getPostComments(postId);
    setComments(response.data.comments);
    return response;
  }

  // Refetch both so the comments list and commentsCount stay in sync
  async function refresh() {
    await Promise.all([getPostDetails(postId), getPostComments(postId)]);
  }

  useEffect(() => {
    setIsLoading(true);
    refresh().finally(() => setIsLoading(false));
  }, [postId]);

  async function deletePost(postId: string) {
    await postsService.deletePost(postId);
    navigate("/");
  }

  const createComment: createCommentI = async (postId, formData) => {
    await commentsServices.createComment(postId, formData);
    refresh();
  };

  const editComment: editCommentI = async (postId, commentId, formData) => {
    await commentsServices.editComment(postId, commentId, formData);
    refresh();
  };

  async function deleteComment(postId: string, commentId: string): Promise<Response<{}>> {
    const response = await commentsServices.deleteComment(postId, commentId);
    refresh();
    return response;
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Post
      post={post}
      comments={comments}
      deletePost={deletePost}
      createComment={createComment}
      deleteComment={deleteComment}
      editComment={editComment}
    ></Post>
  );
}
