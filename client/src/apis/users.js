import instance from "./axios";

export const login =async (email, password)=>{
    const response = await instance({
        method:'post',
        url:'/login',
        data:{
            email,
            password
        }
    })
   // console.log(response)
    return response.data

}

