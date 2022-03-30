const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')



const findbyCredentials = async function(email,password){
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Email or password is incorrect')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error('Email or password is incorrect')
    }
    return user

}

const generateAuthToken = async function(id){
    const token = jwt.sign({_id: id.toString()},'thisisasecret',{expiresIn:'1h'})
    return token

}

module.exports = {
    findbyCredentials,
    generateAuthToken
}