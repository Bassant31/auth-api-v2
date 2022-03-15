require('./db/mongoose')

const express = require('express')
/*const userRouter= require('./routers/user')
const roleRouter = require('./routers/role')*/

const app= express()
app.use(express.json())
/*app.use(userRouter)
app.use(roleRouter)*/


module.exports = app