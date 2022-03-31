import instance from "./axios";



export const createRole =async (name, description)=>{

    const response = await instance({
        method:'post',
        url:'/roles',
        data:{
            name,
            description
        },
       
    })
    return response.data

}

export const getRole = async(token)=>{
    const response = await instance({
        method:'get',
        url:'/roles',
        headers:{
        'Authorization':token
        }
    })
    return response.data
}


export const updateRole =  async (id,name,description)=>{
    const response = await instance({
        method:'patch',
        url:'/roles',
        data:{
            id,
            name,
            description
        }
    })
    return response.data
}

export const deleteRole = async (id)=>{
    const response = await instance({
        method:'DELETE',
        url:`/roles/${id}`  
    })
    return response.data


}