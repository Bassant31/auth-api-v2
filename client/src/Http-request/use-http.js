import {useState,useCallback, useContext} from "react"
import AuthContext from "../store/auth-context";

const useHttp=()=>{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx= useContext(AuthContext)

  const sendRequest = useCallback( async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url,{
          method:requestConfig.method ? requestConfig.method :'GET',
          headers:requestConfig.headers ? requestConfig.headers:{'Content-Type':'application/json',
          'Authorization':authCtx.token},
          body:requestConfig.body ? requestConfig.body:null
      });

      const data = await response.json()
      setIsLoading(false)

      if (!response.ok) {
        throw new Error(data.message)  
      }
      return data

    } catch (err) {
      setError(err.message);
    }
    
  },[authCtx.token]);
  return {
      isLoading,
      error,
      sendRequest
  }
}


export default useHttp