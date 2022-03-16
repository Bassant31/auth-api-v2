import AddNewRole from '../components/Roles/AddNewRole'
import { useContext } from 'react'
import AuthContext from '../store/auth-context'

const AddNewRolePage = ()=>{
    const authCtx = useContext(AuthContext)
    const admin = authCtx.admin
    const isLoggedIn = authCtx.isLoggedIn
    
    return(
        <div>
        {admin && isLoggedIn &&<AddNewRole></AddNewRole>}
        {!admin && <h1>You are not authorized to access this page !!</h1>}

        </div>
    )
}

export default AddNewRolePage