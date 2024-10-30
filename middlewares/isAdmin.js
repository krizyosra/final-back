const IsAdmin=(req,res,next)=>{

    if(req.user.role!=="admin"){
            return res.status(401).send({msg:"non autorisé"})
    }
    next()
}

module.exports = IsAdmin;