import classes from './Home.module.css'
import { Link } from 'react-router-dom'



const Home = (props)=>{
   const info= props.userInfo
  const role = info.role ? info.role.name :'No role'
  const description = info.role ? info.role.description :'You are not assigned a role yet'
  
   let Content
   if (!info.admin){
       Content = <div >
           <h3>Your Role is: {role} </h3>
           <h4>{description}</h4>
           {role === 'developer' && <Link className={classes.style} to='/development'> Development Plan </Link>}
           {role === 'tester' && <Link className={classes.style} to='/testing'> Testing Plan </Link> }
       </div>
   }else if (info.admin)
   {
       Content= <div>
           <h3>You are the admin of the app ;)</h3>
       </div>
   }
    return (
        <section className={classes.detail}>
            <h1>Hello, welocome to the application</h1>
            <div className={classes.info}>
            <h2>Your Info </h2>
            <h3>Your email is: {info.email} </h3>
           {Content}
            </div>
            
        </section>
    )
}

export default Home