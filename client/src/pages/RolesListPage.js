import AuthContext from "../store/auth-context";

import {  useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import {getRole} from "../apis/roles"

import RolesList from "../components/Roles/RolesList";

const RolesListPage = () => {

    const [roles,setRoles]= useState([])
    const [itemDeleted,setItemDeleted] = useState(false)
    const [error,setError] = useState()
    const authCtx= useContext(AuthContext)
    const isLoggedIn =  authCtx.isLoggedIn

    let onDeleteItemHandler = ()=>{setItemDeleted(!itemDeleted)}
    
    useEffect(()=>{
      getRole()
      .then(data=>{
        setRoles(data)})
      .catch((e)=>setError(e.response.data.message))
    },[ itemDeleted]) 
    // itemDeleted so when delete reload page and get list without deleted item


  return(
      <div>
        {!isLoggedIn && <Redirect to='/login'/>}
        {error?<h1>{error}</h1>:<RolesList roles={roles} deleteItemHandler={onDeleteItemHandler}></RolesList>}

      </div>
      
  )
};

export default RolesListPage;