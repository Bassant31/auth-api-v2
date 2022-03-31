import { useState } from "react";
import { useHistory } from "react-router";
import classes from "./AuthForm.module.css";
import {register} from '../../apis/users'

const RegisterationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState();
  const [isLoading, setIsLoading]= useState(false)



  const history = useHistory();

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

  const submitHandler =  (event) =>{
    event.preventDefault()

    setIsLoading(true)
    register(email,password,name).then(data =>{
      setIsLoading(false)
      alert('Account created')
      history.push('/login')

    }).catch(error =>{
      setIsLoading(false)
      setError(error.response.data.message)
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
          {error && !isLoading && <p>{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default RegisterationForm;
