export interface createCommentI {
  (postId: string, formData: FormData): Promise<void>;
}
