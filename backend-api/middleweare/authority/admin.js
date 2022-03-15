
const adminAuthority = (req,res,next)=>{
       try{
           
        const admin = req.user.admin
        if (!admin)
        {
            throw new Error({message:'You are not authorized to access this page !!'})
        }

        next()
       }catch(e){
        res.status(401).send(e)

       }
       
   }


module.exports = adminAuthority