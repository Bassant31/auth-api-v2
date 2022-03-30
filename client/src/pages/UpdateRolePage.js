import {  useParams } from "react-router-dom"
import UpdateRole from "../components/Roles/UpdateRole"
import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import { Redirect } from "react-router-dom"


const UpdateRolePage  = ()=>{
    const authCtx = useContext(AuthContext)
    const admin = authCtx.admin
    const isLoggedIn = authCtx.isLoggedIn

    const {id,name,description} = useParams()
  
    return(
        <div>
            {!isLoggedIn && <Redirect to='/auth'/>}
            {admin?<UpdateRole roleId={id} roleName={name} roleDesc={description}></UpdateRole>:<h1>You are not authorized to access this page !!</h1>}

        </div>
    )
    
}

export default UpdateRolePage