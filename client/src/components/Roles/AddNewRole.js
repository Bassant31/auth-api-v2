import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useHttp from '../../Http-request/use-http'
import AuthContext from '../../store/auth-context'
import classes from './AddNewRole.module.css'

const AddNewRole = ()=>{

    const roleNameRef = useRef()
    const roleDescRef = useRef()
    const {isLoading,error,sendRequest} = useHttp()
    const [isError , setError] = useState(false)
    const history = useHistory()

    const authCtx = useContext(AuthContext)
    const admin = authCtx.admin
    const isLoggedIn = authCtx.isLoggedIn


  const clearInput = ()=>{
    setError(false)
    roleNameRef.current.value =''
    roleDescRef.current.value =''
  }

    const submitHandler = async(event)=>{
        event.preventDefault()
        const enteredName = roleNameRef.current.value
        const enteredDesc = roleDescRef.current.value
        
        sendRequest({
          url:'/role',
          method:'POST',
          body:JSON.stringify({
              name:enteredName.toLowerCase(),
              description:enteredDesc
          })

      }).then(data=>{
        if(data){
          clearInput()
          history.replace('/roles-list')

        }
        else{
          setError(true)
        }
      })
   
        

      }
    return(
    <section>
      
      { isLoggedIn&& admin &&<form onSubmit={submitHandler}  className={classes.role}>
         <h1>Add New Role</h1>

        <div className={classes.control}>
          <label htmlFor='roleName'>Role Name</label>
          <input type='text' id='roleName' required ref={roleNameRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='roleDesc'>Role Description</label>
          <textarea type='text' id='roleDesc' className={classes.roleDesc} required ref={roleDescRef} />
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && !isLoading && <p>{error}</p>}
   
        <div className={classes.actions}>
           <button>Add</button>
        </div>

      </form>}
      {isLoggedIn && !admin && <h1>{error}</h1>}
      {!isLoggedIn && !admin && <h1>You are not authorized to access this page !!</h1>}
    </section>
    )

}
export default AddNewRole