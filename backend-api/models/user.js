const mongoose = require('mongoose')
const Role = require('../models/role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        trim:true,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
    },
    admin:{
        type: Boolean,
        default:false
    },
    role:{
    type: mongoose.Schema.Types.ObjectId,
    default:null,
    ref:'Role',

}
})


userSchema.methods.toJSON =function(){
    const user= this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}



userSchema.methods.generateAuthToken = async function(){
    const user=this 
    const token = jwt.sign({_id: user._id.toString()},'thisisasecret')
    await user.save()
    return token

}

userSchema.statics.findbyCredentials = async function(email,password){
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Email or password is in correct')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error('Email or password is in correct')
    }
    return user

}


userSchema.pre('save',async function (next){
    const user=this 
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User
