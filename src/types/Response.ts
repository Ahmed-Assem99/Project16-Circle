import type { paginationI } from "../interfaces/paginationI"
import type { PostI } from "../interfaces/postI"

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