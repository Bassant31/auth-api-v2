const getDevPlan =(res)=>{

    const data =' Our  plan is based on the developer team and the project that we are developing. Our goal is to work together with our best effort to meet the user requirement'
    res.send({plan:data})
    
}

const getTesterPlan = (res)=>{
    
    const data ='Our  plan is to test the code modules to deliver the best outcome'

    res.send({plan:data})
    
}

module.exports={
    getDevPlan,
    getTesterPlan
}