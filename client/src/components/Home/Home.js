import classes from './Home.module.css'
import adminContent from '../../HelperFunction/homeContent'



const Home = (props)=>{
   const {admin,role,email}= props.userInfo
   const Role = role ? role.name :'No role'
   const description = role ? role.description :'You are not assigned a role yet'
   let Content = adminContent(admin,Role,description)
    return (
        <section className={classes.detail}>
            <h1>Hello, welocome to the application</h1>
            <div className={classes.info}>
            <h2>Your Info </h2>
            <h3>Your email is: {email} </h3>
           {Content}
            </div>
            
        </section>
    )
}

export default Home