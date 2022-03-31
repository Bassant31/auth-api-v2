import { useEffect, useState, useContext } from 'react'
import classes from './Styles.module.css'
import AuthContext from '../store/auth-context'
import { Redirect } from "react-router-dom"
import {getDevPlan} from '../apis/plans'


const DevelopmentPage= ()=>{
    const [data, setData] = useState()
    const [error, setError] = useState();

    const token = localStorage.getItem('token')


    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    useEffect(()=>{
        const fetchData = async()=>{
            getDevPlan(token).then(data =>{
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
                                       <h1>This is the development plan</h1>
                                       <br/>
                                       <p>
                                       {data}
                                       </p>
                                      </div>
            }
        </div>

         
    
    )
}

export default DevelopmentPage
