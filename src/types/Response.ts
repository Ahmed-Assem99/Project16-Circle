import type { paginationI } from "../interfaces/paginationI"
import type { PostI } from "../interfaces/postI"
import type { CommentI } from "../interfaces/commentI"

export type Response<DataI> ={
    success:boolean,
    message:string,
    data:DataI
}
export type GetPostsResponse = Response<{posts:PostI}> &{
meta:{
    pagination:paginationI
}
}
export type GetPostDetailsResponse = Response<{ post: PostI }>

export type GetPostCommentsResponse = Response<{ comments: CommentI[] }> & {
meta:{
    pagination:paginationI
}
}
