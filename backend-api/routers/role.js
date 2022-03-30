const express = require('express')
const {getRoles,createRole,updateRole,deleteRole} = require('../controllers/role')
const adminAuthority = require('../middleware/authority/admin')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/roles',auth,adminAuthority,(req,res)=>{
    getRoles(res)
    
})

router.post('/roles',auth,adminAuthority,(req,res)=>{
    createRole(req.body,res)
})

router.delete('/roles/:id',auth,adminAuthority,(req,res)=>{
  deleteRole(req.params.id,res)
    
})

router.patch('/roles',auth,adminAuthority,(req,res)=>{
    updateRole(req.body,res)

})


module.exports =router