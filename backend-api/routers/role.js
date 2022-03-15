const express = require('express')
const {getRoles,createRole,updateRole,deleteRole} = require('../controllers/role')
const adminAuthority = require('../middleware/authority/admin')
const auth = require('../middleware/auth')
const router = express.Router()




router.get('/roles',auth,adminAuthority,(req,res)=>{
    getRoles(req,res)
    
})

router.post('/role',auth,adminAuthority,(req,res)=>{
    createRole(req,res)
})

router.delete('/role/:id',auth,adminAuthority,(req,res)=>{
  deleteRole(req,res)
    
})

router.patch('/role',auth,adminAuthority,(req,res)=>{
    updateRole(req,res)
   
    
})




module.exports =router