import instance from "./axios";

export const login =async (email, password)=>{

    const response = await instance({
        method:'post',
        url:'/login',
        data:{
            email,
            password
        },
       
    })
    return response.data

}

