const express = require('express')
const {createNewUser, userLogin, getUsers, getUserInfo, updateUserRole} = require ('../controllers/user')
const auth = require('../middleware/auth')
const adminAuthority = require('../middleware/authority/admin')

const router=new express.Router()

router.post('/users',(req,res)=>{
    
    createNewUser(req.body,res)
})
router.post('/users/login', async(req,res)=>{
    userLogin(req.body,res)
})

router.get('/users', auth,adminAuthority,(req,res)=>{
  getUsers(res)
})

router.get('/users/me',auth,(req,res)=>{
    getUserInfo(req.user,res)
})

router.patch('/users',auth,adminAuthority,async(req,res) =>{
    updateUserRole(req.body,res)
   })


module.exports = router