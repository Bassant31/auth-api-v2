const express = require('express')
const Role = require('../models/role')
const User = require('../models/user')
const adminAuthority = require('../middleware/Authority/a')
const auth = require('../middleware/auth')
const router = express.Router()




router.get('/roles',auth,adminAuthority,async(req,res)=>{
    try{

        const roles = await Role.find({})
        res.status(200).send(roles)

    }
    catch(e){
        res.status(400).send(e)

    }
    
})



module.exports =router