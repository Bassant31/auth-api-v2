const mongoose = require ('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next)=>{
    try{
        
       const token= req.header('Authorization')
        
        const decode =  jwt.verify(token,'thisisasecret')
        const user = await User.findOne({_id:decode._id}).populate('role')
        if (!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        

        next()
        
    }catch(e){
        res.status(401).send('Please authenticate !!')
    }
}

module.exports = auth 