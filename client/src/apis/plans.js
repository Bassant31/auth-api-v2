import instance from "./axios";

export const getDevPlan =async (token)=>{
    const response =await instance({
        method:'get',
        url:'/devplan',
        headers:{
            'Authorization':token
        }
    })
    const {data:{plan}} = response
    return plan
}

export const getTestPlan =async(token)=>{
    const response = await instance({
        method:'get',
        url:'/testplan',
        headers:{
            'Authorization':token
        }
    })
    const {data:{plan}} = response
    return plan
}
