export interface editCommentI {
  (postId: string, commentId: string, formData: FormData): Promise<void>;
}
