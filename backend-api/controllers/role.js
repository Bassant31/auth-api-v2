const Role = require('../models/role')
const User = require('../models/user')

const getRoles = async(req,res)=>{
    try{

        const roles = await Role.find({})
        res.status(200).send(roles)

    }
    catch(e){
        res.status(400).send(e)

    }

}
const createRole = async(req,res)=>{
    try{
        const role = new Role(req.body)
        await role.save()
        res.status(201).send(role)

    }
    catch(e){
      
        res.status(400).send({message:'Role Already Exist !!'})

    }
}

const updateRole = async (req,res)=>{
     try{
         
        const role=await Role.findByIdAndUpdate(req.body.id,{name:req.body.name,description:req.body.description},{new:true})
        res.status(201).send(role)

    }
    catch(e){
      
        res.status(400).send({message:'Role Already Exist!!'})

    }
}

const deleteRole = async(req,res)=>{
      try{
          // check user here
          
        const count = await User.find({role:req.params.id}).count()
        if(count>0){
            throw new Error ('cannot delete an asigned role!!')
        }
        else{

            const role = await Role.deleteOne({_id:req.params.id})
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