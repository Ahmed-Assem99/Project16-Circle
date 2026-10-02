import axios from "axios";

class PostsService{


    async getAllPosts(){
        const {data}=await axios.get("https://route-posts.routemisr.com/posts",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data
    }
    
    async createPost(formData:FormData){
        const {data}=await axios.post("https://route-posts.routemisr.com/posts",formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }
}

const postsService=new PostsService
export default postsService;