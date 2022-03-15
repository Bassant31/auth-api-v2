require('../db/mongoose')
const User = require('../models/user')
const addAdmin = async()=>{
    const user = new User({
        name:'Bassant',
        email:'Bassant@test.com',
        password:'admin123',
        admin:true,
    })
    await user.save()
    console.log('Admin Created')
}

addAdmin()

//mongoose.dis