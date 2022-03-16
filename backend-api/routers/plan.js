const express = require('express')
const { getDevPlan, getTesterPlan } = require('../controllers/plan')
const router=new express.Router()
const auth = require('../middleware/auth')
const testerAuthority = require('../middleware/authority/tester')
const developerAuthority = require('../middleware/authority/developer')


router.get('/devplan',auth,developerAuthority,(req,res)=>{
    getDevPlan(req,res)
})

router.get('/testplan',auth,testerAuthority,(req,res)=>{
   getTesterPlan(req,res)
})


module.exports = router