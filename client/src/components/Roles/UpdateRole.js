import { useHistory  } from "react-router-dom"
import { useRef, useState } from 'react'
import useHttp from '../../Http-request/use-http'
import classes from './UpdateRole.module.css'

const UpdateRole = (props)=>{
   
   const [isError , setError] = useState(false)
    const roleNameRef = useRef()
    const roleDescRef = useRef()
   
    
    const {sendRequest,error, isLoading} = useHttp()
    const history = useHistory()

    const submitHandler = async(event)=>{
        event.preventDefault()
        const enteredName = roleNameRef.current.value
        const enteredDesc = roleDescRef.current.value
       
        sendRequest({
          url:'/role',
          method:'PATCH',
          body:JSON.stringify({
              id:props.roleId,
              name:enteredName.toLowerCase(),
              description:enteredDesc
          }),

      }).then(data =>{
        if(data){ 
        roleNameRef.current.value =""
        roleDescRef.current.value =""
        setError(false)
        history.replace('/roles-list')}
        else{
          setError(true)
        }
      
      })
        
    }

    return(
        <section>
      
     <form onSubmit={submitHandler}  className={classes.role}>
          <h1>Update Role</h1>

        <div className={classes.control}>
          <label htmlFor='roleName'>New Name</label>
          <input type='text' id='roleName' required ref={roleNameRef}  defaultValue={props.roleName}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='roleDesc'>New Description</label>
          <textarea type='text' id='roleDesc' className={classes.roleDesc} required ref={roleDescRef} defaultValue={props.roleDesc} />
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && !isLoading && <p>{error}</p>}
   
        <div className={classes.actions}>
           <button>Change</button>
        </div>

      </form>
      
    </section>


    )

}
export default UpdateRole