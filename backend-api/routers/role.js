const express = require('express')
const {getRoles,createRole,updateRole,deleteRole} = require('../controllers/role')
const adminAuthority = require('../middleware/authority/admin')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/roles',auth,adminAuthority,(req,res)=>{
    getRoles(res)
    
})

router.post('/roles',auth,adminAuthority,(req,res)=>{
    createRole(req,res)
})

router.delete('/roles/:id',auth,adminAuthority,(req,res)=>{
  deleteRole(req,res)
    
})

router.patch('/roles',auth,adminAuthority,(req,res)=>{
    updateRole(req,res)

})


module.exports =router