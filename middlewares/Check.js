const Comment = require("../Models/Comments");


const Check= async (req,res,next)=>{


    const user=req.user
    const commentId= req.params.id
    const comment = await Comment.findById(commentId)
    
  


     if(user.role !== "customer" && user._id !== comment.user._id){
    
        return res.status(401).send({msg: "non authorisé"})
     }
     next()



};





module.exports = Check;