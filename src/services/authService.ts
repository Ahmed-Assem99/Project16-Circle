import  axios  from 'axios';
import type { RegisterData } from '../types/RegisterData';
import type { LogInData } from '../types/LogInData';


class AuthServices{
    


    async signUp(registerData: RegisterData){
        const {data} = await axios.post("https://route-posts.routemisr.com/users/signup",registerData)
        return data

    }
    async signIn(logInData: LogInData){
        const {data} = await axios.post("https://route-posts.routemisr.com/users/signin",logInData)
        return data

    }

    async getUserData(){
        const {data}=await axios.get("https://route-posts.routemisr.com/users/profile-data",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }
}

export const authServices = new AuthServices()