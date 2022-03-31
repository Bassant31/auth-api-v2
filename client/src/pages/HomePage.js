import Home from "../components/Home/Home"
import AuthContext from "../store/auth-context"
import { useEffect, useState, useContext } from "react"
import { Redirect } from "react-router-dom"
import {getUserInformation} from '../apis/users'

const HomePage=()=>{
    const [isLoading, setIsLoading]= useState(false)

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    const [info,setInfo]=useState()

    const token = localStorage.getItem('token')

    useEffect(()=>{
        const getUserInfo = async ()=>{
            setIsLoading(true)
            const data = await getUserInformation(token)
            setInfo(data)
            setIsLoading(false)
        }
        getUserInfo()
    },[token])

 
return(
    <div>
        {!isLoggedIn && <Redirect to='/login'/>} 
        {isLoading && <p>Loading...</p>}
        {!isLoading  && info && <Home userInfo={info} />}

    </div>
   
)
}

export default HomePage