import classes from "./UserItem.module.css";
import {updateUserRole} from '../../apis/users'
import { useState } from "react";



const UserItem = (props) => {
  const [role,setRole]=useState(props.role)

  const token = localStorage.getItem('token')

  let newRole = props.role;
  const Roles=[{name: 'no role'}]

 for(const role in props.listOfRoles){
   Roles.push({name : props.listOfRoles[role].name})
 }

  function changeHandler(e) {
    newRole = e.target.value;
  }

  const saveHandler=async()=> {
    await updateUserRole(token, props.id, newRole)
    setRole(newRole)
  }

  return (
    <li className={classes["user-item"]}>
      <div>
        <h2>{props.name}</h2>
        <h2>{role}</h2>
      </div>
      <div>
        <h4>Change the user role</h4>
        <select onChange={changeHandler} value={role}>
          {Roles.map((role) => (
            <option value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>

      <button onClick={saveHandler}>Save changes</button>
    </li>
  );
};

export default UserItem;
