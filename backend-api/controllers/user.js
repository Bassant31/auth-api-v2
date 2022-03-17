const User=require('../models/user')
const Role = require('../models/role')
const credentialValidation = require('../helper/validation')

const createNewUser = async(req,res) =>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send({user})
    }catch(e){
        res.status(400).send({message:'Please try another email'})
    }

}
const userLogin = async(req,res)=>{
    try{
        credentialValidation(req.body.email, req.body.password)
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const info=await user.populate('role')
        res.send({token,info})


    }catch(e){
        res.status(400).send({message:e.message})
    }
}

const getUsers = async(req,res)=>{
    try{
        const users = await User.find({admin:false}).populate('role')
        res.send({users})
    }catch(e){
        res.status(500).send()
    }
}

const getUserInfo = async(req,res) =>{
    const user= req.user
    const info = await user.populate('role')
    res.send(info)
}

const updateUserRole = async(req,res)=>{
    try{
        let user
        const newRole= await Role.findOne({name:req.body.role})
        if(newRole){
         user= await User.findByIdAndUpdate(req.body.id,{role:newRole._id},{new:true})
        }else{
       user =await User.findByIdAndUpdate(req.body.id,{role:null},{new:true})

        }
        res.send(user)
        
    }catch(e){
        res.status(500).send()
    }

}

module.exports={
    createNewUser,
    userLogin,
    getUsers,
    getUserInfo,
    updateUserRole
}