import { useState, useContext } from "react";
import useHttp from "../../Http-request/use-http";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";
import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();

  const [isError, setisError] = useState(false);

  const switchAuthModeHandler = () => {
    history.push("/register");
  };

  const emailChangeHandler =(event)=>{
      setEmail(event.target.value)
  }
  const passwordChangeHandler =(event)=>{
    setPassword(event.target.value)
}


const submitHandler = async (event) =>{
    event.preventDefault()
   
    sendRequest({
      url:'/login',
       method:'POST',
       body:JSON.stringify( {
        email: email,
        password: password,
      }),
        headers:{
      'Content-Type':'application/json'
    },
  }).then(data =>{
    if(data){
      const {exp}= jwt_decode(data.token)
     const expirationTime=new Date(exp*1000)
    authCtx.login(data.token,expirationTime.toISOString(),data.info.admin)
    history.replace('/home')
    }
    else{
        setisError(true)
      }
    
  })
   
}
  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required  onChange={emailChangeHandler}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" minLength="7" required onChange={passwordChangeHandler} />
        </div>

        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Loading...</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            Create new account
          </button>
          {isError && !isLoading && <p>{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
