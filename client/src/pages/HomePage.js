import Home from "../components/Home/Home"
import useHttp from "../Http-request/use-http"
import AuthContext from "../store/auth-context"
import { useEffect, useState, useContext } from "react"
import { Redirect } from "react-router-dom"

const HomePage=()=>{

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    const [info,setInfo]=useState()
    const {isLoading,sendRequest} = useHttp()

    useEffect(()=>{
        const getUserInfo= async()=>{
            const data = await sendRequest({
                url:'/users/me',
            })
            setInfo(data)            

        }
        getUserInfo()
    },[sendRequest])

 
return(
    <div>
        {!isLoggedIn && <Redirect to='/auth'/>} 
        {isLoading && <p>Loading...</p>}
        {!isLoading && info && <Home userInfo={info} />}

    </div>
   
)
}

export default HomePage