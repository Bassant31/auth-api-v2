import classes from './RoleListItem.module.css'
import useHttp from '../../Http-request/use-http'
import Card from '../UI/Card'
import { Link } from 'react-router-dom'

const RoleListItem = (props)=>{
    const {sendRequest,error} = useHttp()
    const onDeleteHandler = async()=>{
       sendRequest({
            url:`/role/${props.id}`,
            method:'DELETE',
        }).then(data =>{
            if (data){
           props.deleteItem()}
            
        })
    
    }
    
    return(
        <li className={classes.item}>
            <Card>
                <h2>{props.name}</h2>
                <h3>{props.description}</h3>
                {!props.block&&<Link to={`/update/${props.id}/${props.name}/${props.description}`} className={classes.link}>Update</Link>}
                <br></br>
                {!props.block&&<button className={classes.button}onClick={onDeleteHandler}>Delete</button>}
                {error && alert(error)}
            </Card>

        </li>
        

    )
}

export default RoleListItem