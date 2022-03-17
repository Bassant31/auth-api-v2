import { useEffect, useState, useContext } from 'react'
import useHttp from '../Http-request/use-http'
import classes from './Styles.module.css'
import AuthContext from '../store/auth-context'
import { Redirect } from "react-router-dom"


const DevelopmentPage= ()=>{
    const {sendRequest, error}= useHttp()
    const [data, setData] = useState()
    const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn

    useEffect(()=>{
        const fetchData = async()=>{
            await sendRequest({
                url:'/devplan',
    
            }).then(data =>{
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

            { !error && <div className={classes.item}>
            <h1>This is the development plan</h1>
            <br/>
            <p>
                {data}
            </p>

        </div>}
        {error && <h1>{error}</h1>}
        </div>
    
    )
}

export default DevelopmentPage
