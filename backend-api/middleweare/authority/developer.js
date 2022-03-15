
const devAuthority = (req,res,next)=>{
       try{
           
        const role = req.user.role
        if (role.name === null ||role !== 'developer')
        {
            throw new Error('You are not authorized to access this page !!')
        }

        next()
       }catch(e){
        res.status(401).send({message:e.message})

       }
       
   }


module.exports = devAuthority