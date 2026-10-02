import type { CommentI } from "./commentI";
import type { UserI } from "./userI";

export interface PostI {

  _id: string;

  body: string;

  image: string;

  privacy: string;

  user: UserI;

  sharedPost: PostI | null;

  likes: string[];

  createdAt: string;

  commentsCount: number;

  topComment: CommentI | null;

  sharesCount: number;

  likesCount: number;

  isShare: boolean;

  id: string;

  bookmarked: boolean;

}