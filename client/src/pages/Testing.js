import classes from './Styles.module.css'
import {  useEffect, useState , useContext} from 'react'
import useHttp from '../Http-request/use-http'
import AuthContext from '../store/auth-context'
import { Redirect } from "react-router-dom"

const TestingPage= ()=>{

    const {sendRequest, error}= useHttp()
    const [data, setData] = useState()

    const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn

    useEffect(()=>{
        const fetchData = async()=>{
           sendRequest({
                url:'/testplan',   
            }).then(data  =>{
                if(data){
                 setData(data.plan)
                }

            })
        }
        fetchData()


    },[sendRequest])
    return(
        <div>
            {!isLoggedIn && <Redirect to='/auth'/>}
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
