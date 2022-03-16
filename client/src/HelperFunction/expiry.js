export const calculateRemainingTime =(expirationTime)=>{

    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date (expirationTime).getTime()
    const remainingTime = adjExpirationTime - currentTime

    return remainingTime
}

export const retrieveStoredToken =()=>{
    const storedToken = localStorage.getItem('token')
    const storedExpirationTime = localStorage.getItem('expirationTime')

    const remainingTime = calculateRemainingTime(storedExpirationTime)

    if(remainingTime <= 60000){
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null
    }

    return {
       token: storedToken,
       duration: remainingTime
    }
}