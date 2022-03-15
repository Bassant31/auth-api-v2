const credentialValidation = (email,password)=>{
    if (!email.includes('@')){
        throw new Error('Invalid email must contain @')
    }
    if (password.length < 7){
        throw new Error('Password must be atleast 7 characters')
    }
}

module.exports= credentialValidation