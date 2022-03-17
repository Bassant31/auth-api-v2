import React, { useState, useEffect,  useCallback } from "react";

import {calculateRemainingTime,retrieveStoredToken} from '../HelperFunction/expiry'

let logoutTimer;

const AuthContext=React.createContext({
    token:'',
    admin:false,
    isLoggedIn: false,
    login:()=>{},
    logout: ()=>{}
})



export const  AuthContextProvider = (props) =>{
  

    const tokenData= retrieveStoredToken()
    let intitialToken
    if(tokenData){
        intitialToken=tokenData.token
    }

    const intitialRole = localStorage.getItem('admin')

    const [admin,setAdmin]=useState(intitialRole)
    const [token, setToken]= useState(intitialToken)

    const userLoggedIn = !!token
    const isAdmin = !!admin
    
    const logoutHandler = useCallback(() =>{
      
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        localStorage.removeItem('expirationTime')
        setAdmin(false)
        setToken(null)
        if(logoutTimer){
            clearTimeout(logoutTimer)
        }
    
    },[])

    const loginHandler = (token,expirationTime,admin) =>{
       if(admin)
       {
        localStorage.setItem('admin','admin')
        setAdmin('admin')
       }
       else{
           setAdmin(null)
       }

        localStorage.setItem('token',token)
        localStorage.setItem('expirationTime',expirationTime)
        setToken(token)

        const remainingTime=calculateRemainingTime(expirationTime)
        logoutTimer= setTimeout(logoutHandler,remainingTime)

    }

    useEffect(()=>{
        if (tokenData){
            logoutTimer= setTimeout(logoutHandler,tokenData.duration)

        }
    },[tokenData, logoutHandler])
  

    const contextValue={
        token:token,
        admin:isAdmin,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext