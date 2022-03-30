const Role = require('../models/role')
const User = require('../models/user')

const getRoles = async(res)=>{
    try{

        const roles = await Role.find({})
        res.status(200).send(roles)

    }
    catch(e){
        res.status(400).send(e)

    }

}
const createRole = async(body,res)=>{
    try{
        const role = new Role(body)
        await role.save()
        res.status(201).send(role)

    }
    catch(e){

        res.status(400).send({message:'Role Already Exist !!'})

    }
}

const updateRole = async ({id,name,description},res)=>{
     try{
         

        const role=await Role.findByIdAndUpdate(id,{name:name,description:description},{new:true})
        res.status(201).send(role)

  
    }
    catch(e){
      
        res.status(400).send({message:'Role Already Exist!!'})

    }
}

const deleteRole = async(id,res)=>{
      try{
          // check user here
        const count = await User.find({role:id}).count()
        
        if(count>0){
            throw new Error ('cannot delete an asigned role!!')
        }
        else{

            const role = await Role.deleteOne({_id:id})
            res.status(200).send(role)

        }

    }
    catch(e){
        res.status(400).send({message:e.message})
    }
}

module.exports = {
    getRoles,
    createRole,
    updateRole,
    deleteRole


}