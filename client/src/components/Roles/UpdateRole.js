import { useHistory  } from "react-router-dom"
import { useState } from 'react'
import useHttp from '../../Http-request/use-http'
import classes from './UpdateRole.module.css'

const UpdateRole = (props)=>{
   
    const [isError , setError] = useState(false)
    const [enteredName,setEnteredName] = useState(props.roleName)
    const [enteredDesc,setEnteredDesc] = useState(props.roleDesc)
    
    const {sendRequest,error, isLoading} = useHttp()
    const history = useHistory()

    const nameChangeHandller = (event)=>{
      console.log("name handler",event.target.value)
        setEnteredName(event.target.value)
        //setEnteredDesc(enteredDesc => enteredDesc)
      }
    const descChangeHandller = (event)=>{
      setEnteredDesc(event.target.value)
     // setEnteredName(enteredName => enteredName)

    }

    const submitHandler = async(event)=>{
        event.preventDefault()

       
        sendRequest({
          url:'/roles',
          method:'PATCH',
          body:JSON.stringify({
              id:props.roleId,
              name:enteredName.toLowerCase(),
              description:enteredDesc
          }),

      }).then(data =>{
        if(data){ 
          setEnteredDesc('')
          setEnteredName('')
        
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
          <input type='text' id='roleName' required onChange={nameChangeHandller}  defaultValue={props.roleName}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='roleDesc'>New Description</label>
          <textarea type='text' id='roleDesc' className={classes.roleDesc} required onChange={descChangeHandller} defaultValue={props.roleDesc} />
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