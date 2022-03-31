import classes from './Styles.module.css'
import {  useEffect, useState , useContext} from 'react'
import AuthContext from '../store/auth-context'
import { Redirect } from "react-router-dom"
import {getTestPlan} from '../apis/plans'

const TestingPage= ()=>{

    const [data, setData] = useState()
    const [error, setError] = useState();

    const token = localStorage.getItem('token')


    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    useEffect(()=>{
        const fetchData = async()=>{
            getTestPlan(token).then(data =>{
                setData(data)
            }).catch(error =>{
                setError(error.response.data.message)
            })
        }
        fetchData()
    },[token])

    
    return(
        <div>
            {!isLoggedIn && <Redirect to='/login'/>}
            {error?<h1>{error}</h1>:<div className={classes.item}>
                                   <h1>This is the testing plan</h1>
                                   <br/>
                                   <p>
                                   {data}
                                     </p>
                                     </div>
            }

      

        </div>
        
    )
}

export default TestingPage
