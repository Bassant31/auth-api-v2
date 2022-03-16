import {  useParams } from "react-router-dom"
import UpdateRole from "../components/Roles/UpdateRole"
import { useContext } from 'react'
import AuthContext from '../store/auth-context'

const UpdateRolePage  = ()=>{
    const authCtx = useContext(AuthContext)
    const admin = authCtx.admin
    const isLoggedIn = authCtx.isLoggedIn

    const {id} = useParams()
    const {name} = useParams()
    const {description} = useParams()
    return(
        <div>
            {admin && isLoggedIn && <UpdateRole roleId={id} roleName={name} roleDesc={description}></UpdateRole>}
           {!admin && <h1>You are not authorized to access this page !!</h1>}

        </div>
    )
    
}

export default UpdateRolePage