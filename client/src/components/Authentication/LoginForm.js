import { useState, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import {login}from '../../apis/users'
import classes from "./AuthForm.module.css";
import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading]= useState(false)

  const history = useHistory();
  const authCtx = useContext(AuthContext);

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

    setIsLoading(true)
   login(email,password).then(data => {
    setIsLoading(false)
    const {exp}= jwt_decode(data.token)
    const expirationTime=new Date(exp*1000)
    authCtx.login(data.token,expirationTime.toISOString(),data.info.admin)

    history.replace('/home')

   }).catch(error=>{
    setIsLoading(false)
    setError(error.response.data.message)
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
          {error && !isLoading && <p>{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
