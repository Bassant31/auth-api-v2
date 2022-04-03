import {getLocalStorage, clearLocalStorage} from '../HelperFunction/localStorage'

export const calculateRemainingTime =(expirationTime)=>{

    const currentTime = new Date().getTime()
    const ExpirationTime = new Date (expirationTime).getTime()
    const remainingTime = ExpirationTime - currentTime

    return remainingTime
}

export const retrieveStoredToken =()=>{
    const{storedToken,storedExpirationTime} = getLocalStorage()
    const remainingTime = calculateRemainingTime(storedExpirationTime)

    if(remainingTime <= 60000){
        clearLocalStorage()
        return null
    }

    return {
       token: storedToken,
       duration: remainingTime
    }
}