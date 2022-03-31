import { useHistory  } from "react-router-dom"
import { useState } from 'react'
import {updateRole} from '../../apis/roles'
import classes from './UpdateRole.module.css'


const UpdateRole = (props)=>{
   
    const [error , setError] = useState("")
    const [loading , setLoading] = useState(false)
    const [enteredName,setEnteredName] = useState(props.roleName)
    const [enteredDesc,setEnteredDesc] = useState(props.roleDesc)
    const history = useHistory()

    const nameChangeHandller = (event)=>{setEnteredName(event.target.value)}
    const descChangeHandller = (event)=>{setEnteredDesc(event.target.value)}

    const submitHandler = async(event)=>{
        event.preventDefault()
        setLoading(true)
        updateRole(props.roleId,enteredName.toLowerCase(),enteredDesc) //call update func
        .then((data)=>{
            setEnteredDesc('')
            setEnteredName('')
            setError("")
            history.replace('/roles-list')
        })
        .catch((error)=>{setError(error.response.data.message)})
        setLoading(false)    
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
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
   
        <div className={classes.actions}>
           <button>Change</button>
        </div>

      </form>
      
    </section>
    )
}
export default UpdateRole