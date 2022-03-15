const express = require('express')
const {createNewUser, userLogin, getUsers, getUserInfo, updateUserRole} = require ('../controllers/user')
const auth = require('../middleware/auth')
const admin = require('../middleware/authority/admin')

const router=new express.Router()

router.post('/users',(req,res)=>{
    createNewUser(req,res)
})
router.post('/users/login', async(req,res)=>{
    userLogin(req,res)
})

router.get('/users', auth,admin,(req,res)=>{
  getUsers(req,res)
})

router.get('/users/me',auth,(req,res)=>{
    getUserInfo(req,res)
})

router.patch('/users',auth,admin,async(req,res) =>{
    updateUserRole(req,res)
   })


module.exports = router