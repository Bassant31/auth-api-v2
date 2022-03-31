import {  useState } from 'react'
import { useHistory } from 'react-router-dom'
import {createRole} from '../../apis/roles'
import {getLocalStorage} from '../../HelperFunction/localStorage'
import classes from './AddNewRole.module.css'

const AddNewRole = ()=>{

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")
    const [enteredName,serEnteredName] = useState("")
    const [enteredDesc,setEnteredDesc] = useState("")
    const {storedToken}= getLocalStorage()
    const history = useHistory()
  

    const nameChangeHandller = (event)=>{serEnteredName(event.target.value)}
    const descChangeHandller = (event)=>{setEnteredDesc(event.target.value)}

    const submitHandler = async(event)=>{
      event.preventDefault()
      setLoading(true)
      createRole(enteredName.toLowerCase(),enteredDesc,storedToken)
      .then(data=>{
        setError("")
         history.replace('/roles-list')
      }).catch(error=>{
        setError(error.response.data.message)
      })
      setLoading(false)

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
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
   
        <div className={classes.actions}>
           <button>Add</button>
        </div>

      </form>
    </section>
    )

}
export default AddNewRole