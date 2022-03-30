import { useState } from "react";
import useHttp from "../../Http-request/use-http";
import { useHistory } from "react-router";
import classes from "./AuthForm.module.css";

const RegisterationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const history = useHistory();

  const { isLoading, error, sendRequest } = useHttp();

  const [isError, setisError] = useState(false);

  const switchAuthModeHandler = () => {
    history.push("/login");
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const submitHandler = async (event) =>{
    event.preventDefault()
    sendRequest({
        url:'/users',
         method:'POST',
         body:JSON.stringify( {
          email: email,
          password: password,
          name:name
        }),
          headers:{
        'Content-Type':'application/json'
      },
    }).then(data => {
      if (data){
      alert('Account created')
      history.push('/login')
    
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
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required onChange={nameChangeHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            minLength="7"
            required
            onChange={passwordChangeHandler}
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && <button>Create account</button>}
          {isLoading && <p>Loading...</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            Login with existing account
          </button>
          {isError && !isLoading && <p>{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default RegisterationForm;
