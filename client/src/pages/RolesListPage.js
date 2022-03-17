import AuthContext from "../store/auth-context";
import useHttp from "../Http-request/use-http";
import {  useContext, useEffect, useState } from "react";
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
          {!error &&<RolesList roles={roles} deleteItemHandler={onDeleteItemHandler}></RolesList>}
          {error && isLoggedIn && <h1>{error}</h1>}
          {!isLoggedIn && <h1>You are not authorized to access this page !!</h1>}

      </div>
      
  )
};

export default RolesListPage;