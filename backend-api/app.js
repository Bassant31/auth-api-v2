const express = require('express')
var cors = require('cors')


require('./db/mongoose')
require('./seeds/addAdmin')
require('./seeds/addMainRoles')

const userRouter= require('./routers/user')
const planRouter = require('./routers/plan')
const roleRouter = require('./routers/role')

const app= express()
app.use(cors())

app.use(express.json())

app.use(userRouter)
app.use(roleRouter)
app.use(planRouter)
app.use(roleRouter)


module.exports = app