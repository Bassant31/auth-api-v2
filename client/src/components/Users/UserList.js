import UserItem from "./UserItem";
import classes from "./UserList.module.css";

const UserList = (props) => {
  return (
    <section className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <UserItem
            key ={user._id}
            id={user._id}
            name={user.name}
            role={user.role ? user.role.name : 'no role'}
            listOfRoles={props.roles}
          />
        ))}
      </ul>
    </section>
  );
};

export default UserList;
