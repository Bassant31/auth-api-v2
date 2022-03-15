
const testerAuthority = (req,res,next)=>{
       try{
           
        const role = req.user.role
        if (role.name === null ||role !== 'tester')
        {
            throw new Error('You are not authorized to access this page !!')
        }

        next()
       }catch(e){
        res.status(401).send({message:e.message})

       }
       
   }


module.exports = testerAuthority