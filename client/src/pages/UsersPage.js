import UserList from "../components/Users/UserList";
import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom"
import {getAllUsers} from '../apis/users'
import { getRole } from "../apis/roles";

import AuthContext from "../store/auth-context";


const UsersPage = () => {
  const [users,setUsers]= useState([])
  const [roles,setRoles]= useState([])
  const [isLoading, setIsLoading]= useState(false)
  const [error, setError]= useState()


  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn

  const token=localStorage.getItem('token')

  useEffect(() => {
    const getRoles= async()=>{
        getRole().then(data =>{
          setRoles(data)
        })
     }
      const getUsers= async()=>{
        setIsLoading(true)
        getAllUsers(token).then(data =>{

          setIsLoading(false)
          setUsers(data)

        }).catch(error =>{

          setIsLoading(false)
          setError(error.response.data.message)
          
        })
        getRoles()
        
      }

      getUsers()  
    
  }, [token]);

  return(
    <div>
    
      
      {!isLoggedIn && <Redirect to='/login'/>}
      {isLoading && <p>Loading...</p>}
      {error?<h1>{error}</h1>:!isLoading &&<UserList users={users} roles={roles} />}
    


    </div>
     );
};

export default UsersPage;
