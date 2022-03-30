
import { Switch, Route } from 'react-router-dom';


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage';
import RolesListPage from './pages/RolesListPage';
import AddNewRolePage from './pages/AddNewRolePage';
import UpdateRolePage from './pages/UpdateRolePage';
import Layout from './components/Layout/Layout'
import DevelopementPage from './pages/DevelopmentPage';
import TestingPage from './pages/Testing';



function App() {
  return (
    <Layout>
      <Switch>
      <Route path='/' exact>
        <LoginPage/>
      </Route>
      <Route path='/login'> 
        <LoginPage/>
      </Route>
      <Route path='/register'> 
        <RegisterPage/>
      </Route>
      <Route path='/home'>
        <HomePage/>
      </Route>
      <Route path='/users'>
        <UsersPage/>
      </Route>
      <Route path='/roles'>
        <RolesListPage/>
      </Route>
      <Route path='/development'>
        <DevelopementPage/>
      </Route>
      <Route path='/testing'>
        <TestingPage/>
      </Route>
      <Route path = '/roles-list'>
        <RolesListPage/>
      </Route>
      <Route path = '/add-new-role'>
        <AddNewRolePage/>
      </Route>
       <Route path = '/update/:id/:name/:description'>
         <UpdateRolePage/>
      </Route>
    </Switch>
    
    </Layout>
  );
}

export default App;
