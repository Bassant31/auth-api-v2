import {  useState } from 'react'
import { useHistory } from 'react-router-dom'
import useHttp from '../../Http-request/use-http'
import classes from './AddNewRole.module.css'

const AddNewRole = ()=>{

   
    const {isLoading,error,sendRequest} = useHttp()
    const [isError , setError] = useState(false)
    const history = useHistory()
    const [enteredName,serEnteredName] = useState("")
    const [enteredDesc,setEnteredDesc] = useState("")

    const nameChangeHandller = (event)=>{
          serEnteredName(event.target.value)

        }
    const descChangeHandller = (event)=>{
          setEnteredDesc(event.target.value)

        }

    const submitHandler = async(event)=>{
        event.preventDefault()
        
        
        sendRequest({
          url:'/roles',
          method:'POST',
          body:JSON.stringify({
              name:enteredName.toLowerCase(),
              description:enteredDesc
          })

      }).then(data=>{
        if(data){
          setError(false)
          history.replace('/roles-list')

        }
        else{
          setError(true)
        }
      })
   
        

      }
    return(
    <section>
      
   <form onSubmit={submitHandler}  className={classes.role}>
         <h1>Add New Role</h1>

        <div className={classes.control}>
          <label htmlFor='roleName'>Role Name</label>
          <input type='text' id='roleName' required  onChange={nameChangeHandller} />
        </div>

        <div className={classes.control}>
          <label htmlFor='roleDesc'>Role Description</label>
          <textarea type='text' id='roleDesc' className={classes.roleDesc} required onChange={descChangeHandller} />
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && !isLoading && <p>{error}</p>}
   
        <div className={classes.actions}>
           <button>Add</button>
        </div>

      </form>
    </section>
    )

}
export default AddNewRole