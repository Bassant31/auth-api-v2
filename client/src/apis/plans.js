import instance from "./axios";

const getDevPlan =()=>{
    instance({
        method:'get',
        url:'/devplan',
        headers:{}
    })
}

