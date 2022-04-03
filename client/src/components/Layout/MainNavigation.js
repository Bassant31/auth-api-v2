import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory()

  const authCtx = useContext(AuthContext)
  const {isLoggedIn, admin}= authCtx
  
  function logoutHandler(){
    authCtx.logout()
   
    history.replace('/login')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn &&
            <li>
              <Link to='/Home'>Home</Link>
            </li>}
          {isLoggedIn && admin &&
            <li>
              <Link to='/roles-list'>Roles</Link>
            </li>}
          {isLoggedIn &&  admin &&
            <li>
              <Link to='/users'>Users </Link>
            </li>}
          {isLoggedIn &&
            <li>
              {<button onClick={logoutHandler}>Logout</button>}
            </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
