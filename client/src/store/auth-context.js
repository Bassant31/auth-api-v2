import React, { useState, useEffect } from "react";

import {calculateRemainingTime,retrieveStoredToken} from '../HelperFunction/expiry'
import {setLocalStorage, clearLocalStorage} from '../HelperFunction/localStorage'
import {getUserInformation} from '../apis/users'

let logoutTimer;

const AuthContext=React.createContext({
    admin:false,
    isLoggedIn: false,
    login:()=>{},
    logout: ()=>{}
})

const getAdmin = async(token)=>{
    if (token){
        const data = await getUserInformation(token)
        const admin = data.admin ?'admin':null
        return admin     
    }
    return null
}

export const  AuthContextProvider = (props) =>{
  
   const tokenData= retrieveStoredToken()
    let intitialToken
    if(tokenData){
        intitialToken=tokenData.token
    }

   const [token, setToken]= useState(intitialToken)
   const [admin,setAdmin]=useState(null)

    getAdmin(token).then(adminRole =>{
        setAdmin(adminRole)
    })

    const userLoggedIn = !!token
    const isAdmin = !!admin
    
    const logoutHandler = () =>{
      
       clearLocalStorage()
        setAdmin(false)
        setToken(null)
        if(logoutTimer){
            clearTimeout(logoutTimer)
        }
    
    }

    const loginHandler = (token,expirationTime,admin) =>{

        admin ? setAdmin('admin'):setAdmin(null)
        setLocalStorage(token, expirationTime)
        setToken(token)

        const remainingTime=calculateRemainingTime(expirationTime)
        logoutTimer= setTimeout(logoutHandler,remainingTime)

    }

    useEffect(()=>{
        if (tokenData){
            logoutTimer= setTimeout(logoutHandler,tokenData.duration)
        }
    },[tokenData])
  

    const contextValue={
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