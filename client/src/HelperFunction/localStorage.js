export const clearLocalStorage =()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')

}

export const setLocalStorage =(token,expirationTime)=>{
    localStorage.setItem('token',token)
    localStorage.setItem('expirationTime',expirationTime)
}

export const getLocalStorage = ()=>{
    const storedToken = localStorage.getItem('token')
    const storedExpirationTime = localStorage.getItem('expirationTime')

    return {
        storedToken,
        storedExpirationTime
    }
}