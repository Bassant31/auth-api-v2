require('./db/mongoose')

const express = require('express')
const userRouter= require('./routers/user')
const planRouter = require('./routers/plan')
const roleRouter = require('./routers/role')

const app= express()
app.use(express.json())

app.use(userRouter)
app.use(planRouter)
app.use(roleRouter)


module.exports = app