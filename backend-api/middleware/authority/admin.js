
const adminAuthority = (req,res,next)=>{
       try{
           
        const admin = req.user.admin
        if (!admin)
        {
            throw new Error('You are not authorized to access this page !!')
        }

        next()
       }catch(e){
        res.status(401).send({message:e.message})

       }
       
   }


module.exports = adminAuthority