import AddNewRole from '../components/Roles/AddNewRole'
import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import { Redirect } from "react-router-dom"


const AddNewRolePage = ()=>{
    const authCtx = useContext(AuthContext)
    const {admin,isLoggedIn} = authCtx
    
    return(
        <div>
        {!isLoggedIn && <Redirect to='/login'/>}
        {admin?<AddNewRole></AddNewRole>:<h1>You are not authorized to access this page !!</h1>}
        </div>
    )
}

export default AddNewRolePage