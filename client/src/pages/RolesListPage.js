import AuthContext from "../store/auth-context";

import {  useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import {getRole} from "../apis/roles"

import RolesList from "../components/Roles/RolesList";

const RolesListPage = () => {

    const [roles,setRoles]= useState([])
    const [itemDeleted,setItemDeleted] = useState(false)
    const [error,setError] = useState(false)
    const authCtx= useContext(AuthContext)
    const isLoggedIn =  authCtx.isLoggedIn

    let onDeleteItemHandler = ()=>{setItemDeleted(!itemDeleted)}
    
    useEffect(()=>{
      getRole(authCtx.token)
      .then(data=>{
        setRoles(data)})
      .catch((e)=>setError(true))
    },[authCtx.token,getRole,itemDeleted]) 
    // itemDeleted so when delete reload page and get list without deleted item


  return(
      <div>
        {!isLoggedIn && <Redirect to='/auth'/>}
        {error?<h1>{error}</h1>:<RolesList roles={roles} deleteItemHandler={onDeleteItemHandler}></RolesList>}

      </div>
      
  )
};

export default RolesListPage;