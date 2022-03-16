import classes from "./UserItem.module.css";
import useHttp from "../../Http-request/use-http";
import { useState } from "react";

const UserItem = (props) => {
  const { sendRequest } = useHttp();
   const [role,setRole]=useState(props.role)

  let newRole = props.role;

  
const Roles=[{name: 'no role'}]
 for(const role in props.listOfRoles){
   Roles.push({name : props.listOfRoles[role].name})
 }

  function changeHandler(e) {
    newRole = e.target.value;
  }
  function saveHandler() {
    sendRequest({
      url:'/users',
      method: 'PATCH',
      body: JSON.stringify({ id: props.id, role: newRole }),
      
    });
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
