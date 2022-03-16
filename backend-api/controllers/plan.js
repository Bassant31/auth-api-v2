const getDevPlan =(req,res)=>{
    try{
        const data =' Our  plan is based on the developer team and the project that we are developing. Our goal is to work together with our best effort to meet the user requirement'

        res.send({plan:data})
    }catch(e){
        res.status(500).send({message:e.message})
    }
}

const getTesterPlan = (req,res)=>{
    try{
        const data ='Our  plan is to test the code modules to deliver the best outcome'

        res.send({plan:data})
    }catch(e){
        res.status(500).send({message:e.message})
    }
}

module.exports={
    getDevPlan,
    getTesterPlan
}