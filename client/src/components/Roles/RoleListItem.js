import classes from './RoleListItem.module.css'
import useHttp from '../../Http-request/use-http'
import Card from '../UI/Card'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const RoleListItem = (props)=>{
    const {sendRequest,error} = useHttp()
    const [Error, setError] = useState(false)
    
    const onDeleteHandler = async()=>{
       sendRequest({
            url:`/roles/${props.id}`,
            method:'DELETE',
        }).then(data =>{
            if (data){
        setError(false)
           props.deleteItem()
        }
        else{
            setError(true)
        }
            
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
                {Error && <h3>{error}</h3>}
            </Card>

        </li>
        

    )
}

export default RoleListItem