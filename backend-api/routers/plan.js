const express = require('express')
const { getDevPlan, getTesterPlan } = require('../controllers/plan')
const router=new express.Router()
const auth = require('../middleware/auth')
const tester = require('../middleware/authority/tester')
const developer = require('../middleware/authority/developer')


router.get('/devplan',auth,developer,(req,res)=>{
    getDevPlan(req,res)
})

router.get('/testplan',auth,tester,(req,res)=>{
   getTesterPlan(req,res)
})


module.exports = router