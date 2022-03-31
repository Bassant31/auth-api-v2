import instance from "./axios";
import {getLocalStorage} from '../HelperFunction/localStorage'

const {storedToken}= getLocalStorage()
    


export const createRole =async (name, description)=>requestConfig('post','/roles',{name,description})

export const getRole = async()=>requestConfig('get','/roles',{})

export const updateRole =  async (id,name,description)=>requestConfig('patch','/roles',{id,name,description})

export const deleteRole = async (id)=>requestConfig('delete',`/roles/${id}`,{})

const requestConfig= async (method,url,data)=>{
      const response = await instance({
        method,
        url ,
        data:data?data:null,
        headers:{
            'Authorization':storedToken
        } 
    })
    return response.data
}