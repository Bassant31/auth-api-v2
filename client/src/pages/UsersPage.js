import UserList from "../components/Users/UserList";
import useHttp from "../Http-request/use-http";
import { useEffect, useState } from "react";


const UsersPage = () => {
  const [users,setUsers]= useState([])
  const [roles,setRoles]= useState([])

  const { sendRequest,error } = useHttp();

  useEffect(() => {
    const getRoles= async()=>{
        
      sendRequest({
           url:'/roles',
       }).then(data =>{
         if (data){
           setRoles(data)

         }
       })
     }
      const getUsers= async()=>{

        sendRequest({
          url: '/users',
         
        }).then(data =>{
          if(data){
            const loadedUsers=[]
          for(const key in data.users){
              loadedUsers.push(data.users[key])
          }
          setUsers(loadedUsers)
          getRoles()
          }
        });
        
      }

      getUsers()
     
    
  }, [sendRequest]);

  return(
    <div>
      {!error &&<UserList users={users} roles={roles} />}
      {error && <h1>{error}</h1>}

    </div>
     );
};

export default UsersPage;
