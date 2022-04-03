import LoginForm from "../components/Authentication/LoginForm";
import AuthContext from "../store/auth-context"
import { useHistory } from "react-router";
import {  useContext } from "react";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn
  if(isLoggedIn){
    console.log(isLoggedIn)
    history.replace('/home')
    return null

  }else{
    return <LoginForm />;

  }
    
  };
  
  export default LoginPage;