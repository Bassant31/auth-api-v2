import classes from './RoleListItem.module.css'
import Card from '../UI/Card'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {deleteRole} from '../../apis/roles'
import {getLocalStorage} from '../../HelperFunction/localStorage'


const RoleListItem = (props)=>{
    const [error, setError] = useState("")
    const {storedToken}= getLocalStorage()
    
    const onDeleteHandler = async()=>{
        deleteRole(props.id,storedToken)
        .then(data=>{
            setError("")
            props.deleteItem()
        })
        .catch((error)=>{
            setError(error.response.data.message)})
     
    }
    
    return(
        <li className={classes.item}>
            <Card>
                <h2>Role : {props.name}</h2>
                <h3>Description : {props.description}</h3>
                {!props.block&&<Link to={`/update/${props.id}/${props.name}/${props.description}`} className={classes.button}>Update</Link>}
                <br></br>
                {!props.block&&<button className={classes.button}onClick={onDeleteHandler}>Delete</button>}
                {Error && <h3>{error}</h3>}
            </Card>

        </li>
        

    )
}

export default RoleListItem