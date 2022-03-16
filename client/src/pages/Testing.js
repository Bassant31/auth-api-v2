import classes from './Styles.module.css'
import {  useEffect, useState } from 'react'
import useHttp from '../Http-request/use-http'

const TestingPage= ()=>{

    const {sendRequest, error}= useHttp()
    const [data, setData] = useState()

    useEffect(()=>{
        const fetchData = async()=>{
           sendRequest({
                url:'/testplan',   
            }).then(data  =>{
                if(data){
                 setData(data.plan)
                }

            })
        }
        fetchData()


    },[sendRequest])
    return(
        <div>
            {!error && <div className={classes.item}>
            <h1>This is the testing plan</h1>
            <br/>
            <p>
                {data}
            </p>

        </div>}
        {error && <h1>{error}</h1>}

        </div>
        
    )
}

export default TestingPage
