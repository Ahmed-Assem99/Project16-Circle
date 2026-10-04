import axios from "axios"

class CommentsService{

    async createComment(postId:string,formData:FormData){

        const {data}=await axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`,formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }

}
const commentsServices = new CommentsService()
export default commentsServices