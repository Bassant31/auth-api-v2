import AuthContext from "../store/auth-context";
import useHttp from "../Http-request/use-http";
import {  useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom"

import RolesList from "../components/Roles/RolesList";

const RolesListPage = () => {
    const [roles,setRoles]= useState([])
    const {sendRequest, error}= useHttp()

    const authCtx= useContext(AuthContext)
    const isLoggedIn =  authCtx.isLoggedIn

    const [itemDeleted,setItemDeleted] = useState(false)
    let onDeleteItemHandler = ()=>{
        setItemDeleted(!itemDeleted)
            
    }
    
    useEffect(()=>{
        const getRole= async()=>{
            sendRequest({
                url:'/roles',
            }).then(data =>{
              if (data){
                setRoles(data)
     
              }
            })
        }
        getRole()
      

    },[sendRequest,authCtx.token,itemDeleted])


  return(
      <div>
        {!isLoggedIn && <Redirect to='/auth'/>}
        {error?<h1>{error}</h1>:<RolesList roles={roles} deleteItemHandler={onDeleteItemHandler}></RolesList>}

      </div>
      
  )
};

export default RolesListPage;