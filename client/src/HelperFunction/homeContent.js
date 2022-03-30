import { Link } from 'react-router-dom'
import classes from '../components/Home/Home.module.css'

const adminContent = (admin ,role,description)=>{
    if (!admin){
       return( <div >
           <h3>Your Role is: {role} </h3>
           <h4>{description}</h4>
           {role === 'developer' && <Link className={classes.style} to='/development'> Development Plan </Link>}
           {role === 'tester' && <Link className={classes.style} to='/testing'> Testing Plan </Link> }
       </div>)
   }else if (admin)
   {
       return( <div>
           <h3>You are the admin of the app ;)</h3>
       </div>)
   }
   

}
export default adminContent