import UserList from "../components/Users/UserList";
import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom"
import {getAllUsers} from '../apis/users'
import {getRole} from "../apis/roles"
import { getLocalStorage } from "../HelperFunction/localStorage";

import AuthContext from "../store/auth-context";


const UsersPage = () => {
  const [users,setUsers]= useState([])
  const [roles,setRoles]= useState([])
  const [isLoading, setIsLoading]= useState(false)
  const [error, setError]= useState()


  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn

  const {storedToken}= getLocalStorage()

  useEffect(() => {

    const getRoles =()=>{
      getRole(storedToken).then(data=>{setRoles(data)})
    }
    const getUsers =()=>{
      setIsLoading(true)

      getAllUsers(storedToken).then(data =>{
      setIsLoading(false)
      setUsers(data)
      getRoles()

    }).catch(error =>{
        setIsLoading(false)
        setError(error.response.data.message)         
      })
    }

    getUsers()
            
  }, [storedToken]);

  return(
    <div>

      {!isLoggedIn && <Redirect to='/login'/>}
      {isLoading && <p>Loading...</p>}
      {error?<h1>{error}</h1>:!isLoading &&<UserList users={users} roles={roles} />}
      

    </div>
     );
};

export default UsersPage;
