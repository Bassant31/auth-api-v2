
require('../db/mongoose')
const Role = require('../models/role')

const addMainRoles = async()=>{
  
    const tester=new Role({
        name:'tester',
        description:'Tests code modules'
    })
    const developer=new Role({
        name:'developer',
        description:'Developes code modules'
    })
    await Role.insertMany([tester,developer])
    console.log("main roles created")

}

addMainRoles()
//mongoose.disconnect()
