export interface CommentI {
  _id: string;
  content: string;
  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}