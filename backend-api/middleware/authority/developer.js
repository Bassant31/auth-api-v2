
const devAuthority = (req,res,next)=>{
       try{
           
        const role = req.user.role.name
        if (role !== 'developer')
        {
            throw new Error({message:'You are not authorized to access this page !!'})
        }

        next()
       }catch(e){
        res.status(401).send(e)

       }
       
   }


module.exports = devAuthority