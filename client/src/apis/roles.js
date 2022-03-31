import instance from "./axios";
import {getLocalStorage} from '../HelperFunction/localStorage'


    

export const createRole =async (name, description,token)=>requestConfig('post','/roles',{name,description},token)

export const getRole = async(token)=>requestConfig('get','/roles',{},token)

export const updateRole =  async (id,name,description,token)=>requestConfig('patch','/roles',{id,name,description},token)

export const deleteRole = async (id,token)=>requestConfig('delete',`/roles/${id}`,{},token)

const requestConfig= async (method,url,data,token)=>{
      const response = await instance({
        method,
        url ,
        data:data?data:null,
        headers:{
            'Authorization':token
        } 
    })
    return response.data
}