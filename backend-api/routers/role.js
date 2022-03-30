const express = require('express')
const {getRoles,createRole,updateRole,deleteRole} = require('../controllers/role')
const adminAuthority = require('../middleware/authority/admin')
const auth = require('../middleware/auth')
const router = express.Router()





router.get('/roles',auth,adminAuthority,(req,res)=>{
    getRoles(res)
    
})

router.post('/role',auth,adminAuthority,(req,res)=>{
    createRole(req.body,res)
})

router.delete('/role/:id',auth,adminAuthority,(req,res)=>{
  deleteRole(req.params.id,res)
    
})

router.patch('/role',auth,adminAuthority,(req,res)=>{
    updateRole(req.body,res)
   
    
})


module.exports =router