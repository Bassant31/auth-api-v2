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

export const register = async (email,password,name)=>{

    const response = await instance({
        method:'post',
        url:'/users',
        data:{
            email,
            password,
            name
        }
    })
    return response.data
}

export const getUserInformation = async(token)=>{

    const response = await instance({
        method:'get',
        url:'/users/me',
        headers:{
            'Authorization':token
        }
    })

    return response.data

}

export const getAllUsers = async(token)=>{
    const response= await instance({
        method:'get',
        url:'/users',
        headers:{
            'Authorization':token
        }
    })
    return response.data
}

export const updateUserRole = async (token,userID, newRole) =>{
   await instance({
        method:'patch',
        url:'/users',
        data:{
            id:userID,
            role:newRole
        },
        headers:{
            'Authorization':token
        }
    })
}
