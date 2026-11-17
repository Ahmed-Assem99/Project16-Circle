import axios from "axios"
import type { GetPostCommentsResponse } from "../types/Response"

class CommentsService{

    async getPostComments(postId:string,page=1,limit=10):Promise<GetPostCommentsResponse>{
        const {data}=await axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments`,{
            params:{page,limit},
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data
    }

    async createComment(postId:string,formData:FormData){

        const {data}=await axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`,formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }
    async deleteComment(postId:string,commentId:string){
        const {data}=await axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data)
        return data
    }
    async editComment(postId:string,commentId:string,formData:FormData){
        const {data}=await axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data
    }

}
const commentsServices = new CommentsService()
export default commentsServices